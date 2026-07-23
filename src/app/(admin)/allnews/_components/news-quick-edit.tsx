'use client';

import {
  INITIAL_UPDATE_BERITA_FORM,
  INITIAL_STATE_UPDATE_BERITA,
} from '@/constants/berita-constant';
import {
  UpdateBeritaForm,
  updateBeritaSchema,
} from '@/validations/berita-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { updateBerita } from '../actions';
import { toast } from 'sonner';
import { Preview } from '@/types/general';
import FormBerita from './form-berita';
import { Drawer } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { createClient } from '@/lib/supabase/client';
import { Berita } from '@/types/berita';
import { News } from '@/types/general';
import { useBeritaStore } from '@/stores/berita-store';

type CategoryRow = {
  id: number;
  nama_kategori: string;
};

interface NewsQuickEditProps {
  news: News | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: (updatedNews: News) => void;
}

export function NewsQuickEdit({ news, open, onOpenChange, onSaved }: NewsQuickEditProps) {
  const isMobile = useIsMobile();
  const setCurrentBerita = useBeritaStore((state) => state.setCurrentBerita);
  const onSavedRef = useRef(onSaved);

  const form = useForm<UpdateBeritaForm>({
    resolver: zodResolver(updateBeritaSchema),
    defaultValues: INITIAL_UPDATE_BERITA_FORM,
  });

  const [updateBeritaState, updateBeritaAction, isPendingUpdateBerita] =
    useActionState(updateBerita, INITIAL_STATE_UPDATE_BERITA);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    onSavedRef.current = onSaved;
  }, [onSaved]);

  useEffect(() => {
    let isActive = true;

    const fetchKategori = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('kategori')
        .select('id, nama_kategori')
        .order('nama_kategori', { ascending: true });

      if (error) {
        toast.error('Gagal mengambil kategori', {
          description: error.message,
        });
        return;
      }

      if (isActive && data) {
        setCategories((data as CategoryRow[]).map((kat) => ({
          value: kat.id.toString(),
          label: kat.nama_kategori,
        })));
      }
    };

    fetchKategori();

    return () => {
      isActive = false;
    };
  }, []);

  const onSubmit = form.handleSubmit((data) => {
    if (!news?.id) {
      toast.error('Gagal memperbarui berita', {
        description: 'ID berita tidak valid.',
      });
      return;
    }

    // Deteksi apakah ada perubahan nyata pada data berita
    const originalTags = (news.tags ?? []).join(', ');
    const hasImageChanged = !!(preview?.file && preview.file.size > 0);
    const hasDataChanged =
      data.judul !== (news.judul ?? '') ||
      (data.kategori_id ?? '') !== (news.kategori_id?.toString() ?? '') ||
      (data.tags ?? '') !== originalTags ||
      data.status !== (news.status ?? 'draft') ||
      hasImageChanged;

    const formData = new FormData();
    formData.append('id', String(news.id));
    formData.append('judul', data.judul);
    formData.append('kategori_id', data.kategori_id ?? '');
    formData.append('tags', data.tags ?? '');
    formData.append('status', data.status);
    formData.append('has_changes', hasDataChanged ? 'true' : 'false');

    if (hasImageChanged) {
      formData.append('gambar_url', preview!.file!);
    } else {
      formData.append('gambar_url', news.gambar_url ?? '');
    }

    startTransition(() => {
      updateBeritaAction(formData);
    });
  });

  useEffect(() => {
    if (news && open) {
      setCurrentBerita(news as Berita);
      form.reset({
        judul: news.judul ?? '',
        kategori_id: news.kategori_id?.toString() ?? '',
        tags: (news.tags ?? []).join(', '),
        status: news.status ?? 'draft',
        created_at: news.created_at
          ? new Date(news.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        gambar_url: news.gambar_url ?? '',
      });

      if (news.gambar_url) {
        setPreview({
          file: new File([], news.gambar_url),
          displayUrl: news.gambar_url,
        });
      } else {
        setPreview(undefined);
      }
    }
  }, [news, open, setCurrentBerita, form]);

  useEffect(() => {
    if (updateBeritaState?.status === 'error') {
      toast.error('Gagal memperbarui berita', {
        description: updateBeritaState.errors?._form?.[0] || 'Silakan coba lagi.',
      });
    }

    if (updateBeritaState?.status === 'success') {
      if (!updateBeritaState.data) {
        toast.error('Gagal memperbarui tampilan berita', {
          description: 'Data terbaru tidak diterima dari server.',
        });
        return;
      }

      toast.success('Berita berhasil diperbarui');
      form.reset();
      setPreview(undefined);
      setCurrentBerita(null);
      onOpenChange(false);
      onSavedRef.current?.(updateBeritaState.data);
    }
  }, [
    updateBeritaState,
    form,
    onOpenChange,
    setCurrentBerita,
  ]);

  useEffect(() => {
    const displayUrl = preview?.displayUrl;

    return () => {
      if (displayUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(displayUrl);
      }
    };
  }, [preview?.displayUrl]);

  if (!news) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
      <FormBerita
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateBerita}
        type="Update"
        preview={preview}
        setPreview={setPreview}
        categories={categories}
        isMobile={isMobile}
        penulisNama={news.penulis_nama}
      />
    </Drawer>
  );
}
