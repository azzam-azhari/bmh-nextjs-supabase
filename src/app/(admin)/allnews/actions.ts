'use server';

import { deleteFile, uploadFile } from '@/actions/storage-action';
import { createClient } from '@/lib/supabase/server';
import { updateBeritaSchema } from '@/validations/berita-validation';

export async function updateBerita(prevState: any, formData: FormData) {
    let validatedFields = updateBeritaSchema.safeParse({
        judul: formData.get('judul'),
        kategori_id: formData.get('kategori_id') || null,
        tags: formData.get('tags') || null,
        status: formData.get('status'),
        created_at: formData.get('created_at') || null,
        gambar_url: formData.get('gambar_url'),
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

    let gambarUrl = validatedFields.data.gambar_url as string | null;

    if (validatedFields.data.gambar_url instanceof File) {
        const oldGambarUrl = formData.get('old_gambar_url') as string;

        // Cek apakah url lama valid sebelum di-split untuk dihapus
        const filePathToRemove = oldGambarUrl && oldGambarUrl.includes('/images/')
            ? oldGambarUrl.split('/images/')[1]
            : undefined;

        const { errors, data } = await uploadFile(
            'images',
            'berita',
            validatedFields.data.gambar_url,
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

        gambarUrl = data.url;
    }

    const supabase = await createClient();
    const beritaId = formData.get('id') as string;

    const oldStatus = formData.get('old_status') as string;
    const oldPublishedAt = formData.get('old_published_at') as string;
    const originalCreatedAtStr = formData.get('original_created_at') as string;
    const status = validatedFields.data.status;

    // Parse tags: split by comma, trim, filter empty
    const tagsInput = validatedFields.data.tags || '';
    const tagsArray = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

    // Prepare update data
    const updateData: Record<string, any> = {
        judul: validatedFields.data.judul.trim(),
        kategori_id: validatedFields.data.kategori_id ? parseInt(validatedFields.data.kategori_id) : null,
        tags: tagsArray,
        status: status,
        updated_at: new Date().toISOString(),
    };

    // Update gambar_url jika ada perubahan (tidak undefined)
    if (gambarUrl !== undefined) {
        updateData.gambar_url = gambarUrl;
    }

    // Hanya update created_at jika user mengubahnya dan original_created_at ada
    const newCreatedAtDate = validatedFields.data.created_at;
    if (newCreatedAtDate && originalCreatedAtStr) {
        const originalDate = new Date(originalCreatedAtStr);
        const newDate = new Date(newCreatedAtDate);
        newDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds());
        updateData.created_at = newDate.toISOString();
    }

    // Jika status diubah ke published dan belum punya published_at, set sekarang
    if (status === 'published' && (!oldPublishedAt || oldPublishedAt === 'null')) {
        updateData.published_at = new Date().toISOString();
    }
    // Jika status diubah dari published ke draft/archived, hapus published_at
    if (status !== 'published' && oldStatus === 'published') {
        updateData.published_at = null;
    }

    const { error } = await supabase
        .from('berita')
        .update(updateData)
        .eq('id', parseInt(beritaId));

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