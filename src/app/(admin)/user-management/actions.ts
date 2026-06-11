'use server';

import { createClient } from '@/lib/supabase/server';
import { AuthFormState } from '@/types/auth';
import { createUserSchema } from '@/validations/auth-validation';

export async function createUser(prevState: AuthFormState, formData: FormData) {
    const validatedFields = createUserSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        role: formData.get('role'),
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