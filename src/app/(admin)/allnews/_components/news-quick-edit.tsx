'use client';

import {
  INITIAL_STATE_UPDATE_BERITA,
} from '@/constants/berita-constant';
import {
  UpdateBeritaForm,
  updateBeritaSchema,
} from '@/validations/berita-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Drawer } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { createClient } from '@/lib/supabase/client';
import { updateBerita } from '../actions';
import { Preview } from '@/types/general';
import { Berita } from '@/types/berita';
import { News } from '@/types/general';
import FormBerita from './form-berita';
import { useBeritaStore } from "@/stores/berita-store";

interface NewsQuickEditProps {
  news: News | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

export function NewsQuickEdit({ news, open, onOpenChange, onSaved }: NewsQuickEditProps) {
  const isMobile = useIsMobile();
  const setCurrentBerita = useBeritaStore((state) => state.setCurrentBerita);

  const form = useForm<UpdateBeritaForm>({
    resolver: zodResolver(updateBeritaSchema),
  });

  const [updateBeritaState, updateBeritaAction, isPendingUpdateBerita] =
    useActionState(updateBerita, INITIAL_STATE_UPDATE_BERITA);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchKategori = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('kategori')
        .select('id, nama_kategori')
        .order('nama_kategori', { ascending: true });

      if (data && !error) {
        setCategories(data.map((kat: any) => ({
          value: kat.id.toString(),
          label: kat.nama_kategori
        })));
      }
    };
    fetchKategori();
  }, []);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        // Cek apakah user memilih gambar baru (file asli punya size > 0,
        // placeholder File dari URL lama punya size === 0)
        const isNewImage = preview?.file && preview.file.size > 0;

        if (isNewImage) {
            // Gambar baru dipilih: kirim File object untuk gambar_url
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(
                        key,
                        key === 'gambar_url' ? preview!.file! : (value as any).toString()
                    );
                }
            });
            formData.append('old_gambar_url', news?.gambar_url ?? '');
        } else {
            // Gambar tidak berubah: kirim semua sebagai string
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'gambar_url') {
                    // Kirim URL gambar lama (bukan FileList dari input)
                    formData.append(key, news?.gambar_url ?? '');
                } else if (value !== undefined && value !== null) {
                    formData.append(key, (value as any).toString());
                }
            });
        }

        formData.append('id', news?.id?.toString() ?? '');
        formData.append('old_status', news?.status ?? '');
        formData.append('old_published_at', news?.published_at ?? '');
        formData.append('original_created_at', news?.created_at ?? '');

        startTransition(() => {
            updateBeritaAction(formData);
        });
    });

  // Populate form when news prop changes
  useEffect(() => {
    if (news && open) {
      setCurrentBerita(news as Berita);
      form.setValue('judul', news.judul || '');
      form.setValue('kategori_id', news.kategori_id?.toString() || '');
      form.setValue('tags', (news.tags || []).join(', '));
      form.setValue('status', news.status || 'draft');
      form.setValue('created_at', news.created_at ? new Date(news.created_at).toISOString().split('T')[0] : '');
      form.setValue('gambar_url', news.gambar_url || '');

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

  // Handle Server Action Response
  useEffect(() => {
    if (updateBeritaState?.status === 'error') {
      toast.error('Gagal memperbarui berita', {
        description: updateBeritaState.errors?._form?.[0] || 'Silakan coba lagi.',
      });
    }

    if (updateBeritaState?.status === 'success') {
      toast.success('Berita berhasil diperbarui');
      form.reset();
      onOpenChange(false);
      onSaved?.();
    }
  }, [updateBeritaState]);

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
