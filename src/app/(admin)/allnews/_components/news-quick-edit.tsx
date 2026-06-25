'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { News } from '@/types/general';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

interface KategoriOption {
  id: number;
  nama_kategori: string;
}

interface NewsQuickEditProps {
  news: News | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

export function NewsQuickEdit({ news, open, onOpenChange, onSaved }: NewsQuickEditProps) {
  const isMobile = useIsMobile();
  const supabase = createClient();

  // Form state
  const [judul, setJudul] = useState('');
  const [kategoriId, setKategoriId] = useState<string>('');
  const [tagsInput, setTagsInput] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  // Kategori list from Supabase
  const [kategoriList, setKategoriList] = useState<KategoriOption[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch kategori dari Supabase
  useEffect(() => {
    const fetchKategori = async () => {
      const { data, error } = await supabase
        .from('kategori')
        .select('id, nama_kategori')
        .order('nama_kategori', { ascending: true });

      if (data && !error) {
        setKategoriList(data);
      }
    };
    fetchKategori();
  }, []);

  // Populate form saat news berubah
  useEffect(() => {
    if (news && open) {
      setJudul(news.judul || '');
      setKategoriId(news.kategori_id?.toString() || '');
      setTagsInput((news.tags || []).join(', '));
      // created_at to YYYY-MM-DD for native date input
      setCreatedAt(news.created_at ? new Date(news.created_at).toISOString().split('T')[0] : '');
      setStatus(news.status || 'draft');
    }
  }, [news, open]);

  const handleSave = useCallback(async () => {
    if (!news) return;

    // Validasi sederhana
    if (!judul.trim()) {
      toast.error('Judul tidak boleh kosong');
      return;
    }

    setIsSaving(true);

    try {
      // Siapkan tags: split by comma, trim, filter empty
      const tagsArray = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // Siapkan data update
      const updateData: Record<string, unknown> = {
        judul: judul.trim(),
        kategori_id: kategoriId ? parseInt(kategoriId) : null,
        tags: tagsArray,
        status: status,
        updated_at: new Date().toISOString(),
      };

      // Hanya update created_at jika user mengubahnya
      if (createdAt) {
        // Pertahankan waktu asli, hanya ubah tanggal
        const originalDate = new Date(news.created_at);
        const newDate = new Date(createdAt);
        newDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds());
        updateData.created_at = newDate.toISOString();
      }

      // Jika status diubah ke published dan belum punya published_at, set sekarang
      if (status === 'published' && !news.published_at) {
        updateData.published_at = new Date().toISOString();
      }
      // Jika status diubah dari published ke draft/archived, hapus published_at
      if (status !== 'published' && news.status === 'published') {
        updateData.published_at = null;
      }

      const { error } = await supabase
        .from('berita')
        .update(updateData)
        .eq('id', news.id);

      if (error) {
        toast.error('Gagal menyimpan perubahan', {
          description: error.message,
        });
        return;
      }

      toast.success('Berita berhasil diperbarui');
      onOpenChange(false);
      onSaved?.();
    } catch (err) {
      toast.error('Terjadi kesalahan', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setIsSaving(false);
    }
  }, [news, judul, kategoriId, tagsInput, createdAt, status, supabase, onOpenChange, onSaved]);

  if (!news) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
      <DrawerContent className={isMobile ? "max-h-[85vh]" : "h-screen w-full sm:max-w-md"}>
        <DrawerHeader>
          <DrawerTitle>Quick Edit Berita</DrawerTitle>
          <DrawerDescription>Edit informasi dasar berita dengan cepat.</DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {/* Gambar Berita */}
          <div className="w-full h-40 relative rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
            {news.gambar_url && news.gambar_url.length > 0 ? (
              <img 
                src={news.gambar_url[0]} 
                alt={judul} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback jika URL gambar bermasalah/error load
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.fallback-svg');
                    if (fallback) fallback.classList.remove('hidden');
                  }
                }}
              />
            ) : null}
            <div className={`fallback-svg flex flex-col items-center justify-center text-muted-foreground ${news.gambar_url && news.gambar_url.length > 0 ? 'hidden' : ''}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-10 mb-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1.75 0Z" />
              </svg>
              <span className="text-xs">Tidak ada gambar</span>
            </div>
          </div>

          {/* Judul */}
          <div className="space-y-1.5">
            <Label htmlFor="qe-judul">Judul</Label>
            <Input 
              id="qe-judul" 
              value={judul} 
              onChange={(e) => setJudul(e.target.value)} 
              placeholder="Judul berita..."
            />
          </div>

          {/* Grid Author & Kategori */}
          <div className="grid grid-cols-2 gap-4">
            {/* Author (Read-only) */}
            <div className="space-y-1.5">
              <Label htmlFor="qe-author">Author</Label>
              <Input 
                id="qe-author" 
                value={news.penulis_nama || '-'} 
                readOnly 
                disabled
                className="bg-muted text-muted-foreground shadow-inner cursor-not-allowed w-full"
              />
            </div>

            {/* Kategori (Dropdown dari Supabase) */}
            <div className="space-y-1.5">
              <Label htmlFor="qe-kategori">Kategori</Label>
              <Select 
                value={kategoriId} 
                onValueChange={setKategoriId}
              >
                <SelectTrigger id="qe-kategori" className="w-full">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriList.map((kat) => (
                    <SelectItem key={kat.id} value={kat.id.toString()}>
                      {kat.nama_kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="qe-tags">Tags</Label>
            <Input 
              id="qe-tags" 
              placeholder="Contoh: inovasi, pendidikan, terbaru" 
              value={tagsInput} 
              onChange={(e) => setTagsInput(e.target.value)} 
            />
            <p className="text-[11px] text-muted-foreground">Pisahkan dengan koma dan spasi</p>
          </div>

          {/* Grid Tanggal & Status */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date (native date input — auto-close saat tanggal dipilih) */}
            <div className="space-y-1.5">
              <Label htmlFor="qe-date">Tanggal</Label>
              <Input 
                id="qe-date" 
                type="date" 
                value={createdAt} 
                onChange={(e) => {
                  setCreatedAt(e.target.value);
                }} 
                className="block w-full cursor-pointer"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label htmlFor="qe-status">Status</Label>
              <Select 
                value={status} 
                onValueChange={(val) => setStatus(val as 'draft' | 'published' | 'archived')}
              >
                <SelectTrigger id="qe-status" className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <HugeiconsIcon icon={Loading03Icon} className="mr-2 size-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              'Simpan Perubahan'
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={isSaving}>Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
