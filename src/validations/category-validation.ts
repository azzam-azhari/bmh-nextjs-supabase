import { z } from 'zod';

export const createCategorySchema = z.object({
    nama_kategori: z.string().min(1, 'Nama kategori wajib diisi'),
    slug: z.string().min(1, 'Slug wajib diisi')
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda -'),
});

export const updateCategorySchema = z.object({
    nama_kategori: z.string().min(1, 'Nama kategori wajib diisi'),
    slug: z.string().min(1, 'Slug wajib diisi')
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda -'),
});

export type CreateCategoryForm = z.input<typeof createCategorySchema>;
export type UpdateCategoryForm = z.input<typeof updateCategorySchema>;