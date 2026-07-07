import z from 'zod';

export const updateBeritaSchema = z.object({
  judul: z.string().min(1, 'Judul tidak boleh kosong'),
  kategori_id: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']),
  created_at: z.string().optional().nullable(),
  gambar_url: z.union([
    z.string(),
    z.instanceof(File),
  ]).optional().nullable(),
});

export type UpdateBeritaForm = z.infer<typeof updateBeritaSchema>;
