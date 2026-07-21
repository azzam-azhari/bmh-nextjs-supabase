import z from 'zod';

function isValidDateInput(value: string) {
  if (value === '') return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, 'Gambar tidak boleh kosong')
  .refine((file) => file.type.startsWith('image/'), 'File harus berupa gambar')
  .refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'Ukuran gambar maksimal 10 MB',
  );

export const updateBeritaSchema = z.object({
  judul: z.string().trim().min(1, 'Judul tidak boleh kosong'),
  kategori_id: z
    .string()
    .refine((value) => value === '' || /^\d+$/.test(value), 'Kategori tidak valid')
    .optional()
    .nullable(),
  tags: z.string().trim().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']),
  created_at: z
    .string()
    .refine(isValidDateInput, 'Tanggal tidak valid')
    .optional()
    .nullable(),
  gambar_url: z.union([z.string(), imageSchema]).optional().nullable(),
});

export const updateBeritaActionSchema = updateBeritaSchema.extend({
  id: z.coerce.number().int().positive('ID berita tidak valid'),
});

export type UpdateBeritaForm = z.infer<typeof updateBeritaSchema>;
