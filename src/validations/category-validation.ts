import { z } from 'zod';

export const createCategorySchema = z.object({
    nama_kategori: z.string().min(1, 'Nama kategori wajib diisi'),
    slug: z.string().min(1, 'Slug wajib diisi')
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda -'),
    jumlah: z.coerce.number().int().min(0),
});

export const updateCategorySchema = z.object({
    nama_kategori: z.string().min(1, 'Nama kategori wajib diisi'),
    slug: z.string().min(1, 'Slug wajib diisi')
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda -'),
    jumlah: z.coerce.number().int().min(0),
});

export type CreateCategoryForm = z.input<typeof createCategorySchema>;
export type UpdateCategoryForm = z.input<typeof updateCategorySchema>;