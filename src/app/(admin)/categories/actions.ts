'use server';

import { createClient } from '@/lib/supabase/server';
import { formState } from '@/types/general';
import { createCategorySchema, updateCategorySchema } from '@/validations/category-validation';

export async function createCategory(prevState: formState, formData: FormData) {
    const validatedFields = createCategorySchema.safeParse({
        nama_kategori: formData.get('nama_kategori'),
        slug: formData.get('slug'),
        jumlah: formData.get('jumlah'),
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

    const supabase = await createClient();

    const { error } = await supabase
        .from('kategori')
        .insert({
            nama_kategori: validatedFields.data.nama_kategori,
            slug: validatedFields.data.slug,
            jumlah: validatedFields.data.jumlah,
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

    return {
        status: 'success',
    };
}

export async function updateCategory(prevState: formState, formData: FormData) {
    const validatedFields = updateCategorySchema.safeParse({
        nama_kategori: formData.get('nama_kategori'),
        slug: formData.get('slug'),
        jumlah: formData.get('jumlah'),
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

    const supabase = await createClient();
    const id = formData.get('id') as string;

    const { error } = await supabase
        .from('kategori')
        .update({
            nama_kategori: validatedFields.data.nama_kategori,
            slug: validatedFields.data.slug,
            jumlah: validatedFields.data.jumlah,
        })
        .eq('id', Number(id));

    if (error) {
        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [error.message],
            },
        };
    }

    return {
        status: 'success',
    };
}

export async function deleteCategory(prevState: formState, formData: FormData) {
    const supabase = await createClient();
    const id = formData.get('id') as string;

    const { error } = await supabase
        .from('kategori')
        .delete()
        .eq('id', Number(id));

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
