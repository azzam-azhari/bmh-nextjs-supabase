'use server';

import { environment } from '@/configs/environment';
import { createClient } from '@/lib/supabase/server';
import type { BeritaFormState } from '@/types/berita';
import type { News } from '@/types/general';
import { updateBeritaActionSchema } from '@/validations/berita-validation';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const IMAGE_BUCKET = 'images';
const IMAGE_FOLDER = 'berita';

function formError(
  previousState: BeritaFormState,
  message: string,
): BeritaFormState {
  return {
    status: 'error',
    errors: {
      ...previousState.errors,
      _form: [message],
    },
  };
}

function getStoragePath(publicUrl: string | null) {
  if (!publicUrl) return null;

  try {
    const pathname = new URL(publicUrl).pathname;
    const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
    const markerIndex = pathname.indexOf(marker);

    if (markerIndex === -1) return null;

    return decodeURIComponent(pathname.slice(markerIndex + marker.length));
  } catch {
    return null;
  }
}

function createAdminClient() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = environment;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  });
}

export async function updateBerita(
  previousState: BeritaFormState,
  formData: FormData,
): Promise<BeritaFormState> {
  const validatedFields = updateBeritaActionSchema.safeParse({
    id: formData.get('id'),
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

  const sessionClient = await createClient();
  const {
    data: { user },
    error: authError,
  } = await sessionClient.auth.getUser();

  if (authError || !user) {
    return formError(previousState, 'Sesi berakhir. Silakan masuk kembali.');
  }

  // Migration berita mengaktifkan RLS tanpa policy UPDATE. Admin client ini
  // tidak membaca cookie, dibuat setelah sesi diverifikasi, dan tetap server-only.
  const supabase = createAdminClient();

  if (!supabase) {
    return formError(
      previousState,
      'Konfigurasi Supabase server belum lengkap.',
    );
  }

  const { data: currentBerita, error: currentBeritaError } = await supabase
    .from('berita')
    .select('id, gambar_url, published_at, created_at')
    .eq('id', validatedFields.data.id)
    .maybeSingle();

  if (currentBeritaError) {
    return formError(previousState, currentBeritaError.message);
  }

  if (!currentBerita) {
    return formError(previousState, 'Berita tidak ditemukan.');
  }

  const image = validatedFields.data.gambar_url;
  let imageUrl = currentBerita.gambar_url as string | null;
  let uploadedImagePath: string | null = null;

  if (image instanceof File) {
    const safeFileName = image.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    uploadedImagePath = `${IMAGE_FOLDER}/${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(uploadedImagePath, image, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) {
      return formError(previousState, uploadError.message);
    }

    const { data } = supabase.storage
      .from(IMAGE_BUCKET)
      .getPublicUrl(uploadedImagePath);

    imageUrl = data.publicUrl;
  }

  const tags = (validatedFields.data.tags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const updateData: Record<string, unknown> = {
    judul: validatedFields.data.judul,
    kategori_id: validatedFields.data.kategori_id
      ? Number(validatedFields.data.kategori_id)
      : null,
    tags,
    status: validatedFields.data.status,
    gambar_url: imageUrl,
    updated_at: new Date().toISOString(),
  };

  if (validatedFields.data.created_at) {
    const [year, month, day] = validatedFields.data.created_at
      .split('-')
      .map(Number);
    const createdAt = new Date(currentBerita.created_at);
    createdAt.setUTCFullYear(year, month - 1, day);
    updateData.created_at = createdAt.toISOString();
  }

  if (
    validatedFields.data.status === 'published' &&
    !currentBerita.published_at
  ) {
    updateData.published_at = new Date().toISOString();
  } else if (validatedFields.data.status !== 'published') {
    updateData.published_at = null;
  }

  const { data: updatedBerita, error: updateError } = await supabase
    .from('berita')
    .update(updateData)
    .eq('id', validatedFields.data.id)
    .select('*, kategori(id, nama_kategori)')
    .single();

  if (updateError) {
    if (uploadedImagePath) {
      await supabase.storage.from(IMAGE_BUCKET).remove([uploadedImagePath]);
    }

    return formError(previousState, updateError.message);
  }

  if (uploadedImagePath) {
    const previousImagePath = getStoragePath(currentBerita.gambar_url);

    if (previousImagePath && previousImagePath !== uploadedImagePath) {
      await supabase.storage.from(IMAGE_BUCKET).remove([previousImagePath]);
    }
  }

  revalidatePath('/allnews');

  return {
    status: 'success',
    data: updatedBerita as News,
  };
}
