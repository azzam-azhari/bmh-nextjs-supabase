'use server';

import { deleteFile, uploadFile } from '@/actions/storage-action';
import { createClient } from '@/lib/supabase/server';
import { AuthFormState } from '@/types/auth';
import { createUserSchema, updateUserSchema } from '@/validations/auth-validation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createUser(prevState: AuthFormState, formData: FormData) {
    let validatedFields = createUserSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        role: formData.get('role'),
        avatar_url: formData.get('avatar_url'),
    });

    if (!validatedFields.success) {
        return {
            status: 'error',
            errors: {
                ...validatedFields.error.flatten().fieldErrors,
                _form: [],
            },
        };
    }

    if (validatedFields.data.avatar_url instanceof File) {
        const { errors, data } = await uploadFile(
            'images',
            'users',
            validatedFields.data.avatar_url,
        );
        if (errors) {
            return {
                status: 'error',
                errors: {
                    ...prevState.errors,
                    _form: [...errors._form],
                },
            };
        }

        validatedFields = {
            ...validatedFields,
            data: {
                ...validatedFields.data,
                avatar_url: data.url,
            },
        };
    }

    // PERBAIKAN 1: Tambahkan { isAdmin: true } agar menggunakan SUPABASE_SERVICE_ROLE_KEY
    const supabase = await createClient({ isAdmin: true });

    // PERBAIKAN 2: Gunakan Admin API (auth.admin.createUser)
    const { data, error } = await supabase.auth.admin.createUser({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        email_confirm: true, // User langsung aktif tanpa perlu klik link verifikasi email
        user_metadata: {
            name: validatedFields.data.name,
            role: validatedFields.data.role,
            avatar_url: validatedFields.data.avatar_url,
        },
    });

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message],
            },
        };
    }

    // CATATAN: Jika data user tidak masuk ke tabel 'profiles' secara otomatis,
    // Anda mungkin perlu menambahkan kode insert manual ke tabel profiles di sini.
    // Namun, biasanya Database Trigger Supabase tetap berjalan untuk admin.createUser.

    return {
        status: 'success',
    };
}

export async function updateUser(prevState: AuthFormState, formData: FormData) {
    let validatedFields = updateUserSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        avatar_url: formData.get('avatar_url'),
    });

    if (!validatedFields.success) {
        return {
            status: 'error',
            errors: {
                ...validatedFields.error.flatten().fieldErrors,
                _form: [],
            },
        };
    }

    if (validatedFields.data.avatar_url instanceof File) {
        const oldAvatarUrl = formData.get('old_avatar_url') as string;

        // PENCEGAHAN ERROR: Cek apakah url lama valid sebelum di-split
        const filePathToRemove = oldAvatarUrl && oldAvatarUrl.includes('/images/')
            ? oldAvatarUrl.split('/images/')[1]
            : undefined;

        const { errors, data } = await uploadFile(
            'images',
            'users',
            validatedFields.data.avatar_url,
            filePathToRemove
        );

        if (errors) {
            return {
                status: 'error',
                errors: {
                    ...prevState.errors,
                    _form: [...errors._form],
                },
            };
        }

        validatedFields = {
            ...validatedFields,
            data: {
                ...validatedFields.data,
                avatar_url: data.url,
            },
        };
    }

    const supabase = await createClient({ isAdmin: true });
    const userId = formData.get('id') as string;

    // 1. UPDATE TABEL PROFILES
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ name: validatedFields.data.name, role: validatedFields.data.role, avatar_url: validatedFields.data.avatar_url })
        .eq('id', userId);

    if (profileError) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [profileError.message],
            },
        };
    }

    // 1b. SINKRONKAN TABEL BERITA (penulis_nama) UNTUK AUTHOR TERSEBUT
    const { error: beritaSyncError } = await supabase
        .from('berita')
        .update({ penulis_nama: validatedFields.data.name })
        .eq('penulis_id', userId);

    if (beritaSyncError) {
        console.error('Gagal membarui penulis_nama di tabel berita:', beritaSyncError.message);
    }

    revalidatePath('/allnews');

    // 2. UPDATE USER METADATA (Ini yang membuat nav-user terupdate)
    const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
            name: validatedFields.data.name,
            role: validatedFields.data.role,
            avatar_url: validatedFields.data.avatar_url
        }
    });

    if (authError) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [authError.message],
            },
        };
    }

    // 3. UPDATE COOKIE JIKA YANG DIUPDATE ADALAH USER YANG SEDANG LOGIN
    // Karena action ini dijalankan di server, kita tidak bisa ambil session dari client,
    // jadi kita ambil dari `supabase.auth.getUser()`. Namun perlu diingat bahwa
    // supabase auth client yang ada di atas dibuat dengan `isAdmin: true` (Service Role),
    // sehingga auth context dari session user yang login harus diambil dengan auth biasa.

    // Mari buat client biasa khusus untuk cek session (menggunakan session cookies).
    const supabaseClient = await createClient();
    const { data: { user: currentUser } } = await supabaseClient.auth.getUser();

    if (currentUser?.id === userId) {
        const { data: updatedProfile } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (updatedProfile) {
            const cookieStore = await cookies();
            cookieStore.set('user_profile', JSON.stringify(updatedProfile), {
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 365,
            });
        }
    }

    return {
        status: 'success',
    };
}

export async function deleteUser(prevState: AuthFormState, formData: FormData) {
    const supabase = await createClient({ isAdmin: true });
    const image = formData.get('avatar_url') as string;
    const { status, errors } = await deleteFile(
        'images',
        image.split('/images/')[1],
    );

    if (status === 'error') {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [errors?._form?.[0] ?? 'Unknown error'],
            },
        };
    }

    const { error } = await supabase.auth.admin.deleteUser(
        formData.get('id') as string,
    );

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message],
            },
        };
    }

    return { status: 'success' };
}