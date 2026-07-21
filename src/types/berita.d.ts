import type { News } from './general';

export type Berita = {
  id?: number;
  judul?: string;
  slug?: string;
  isi_berita?: string | null;
  gambar_url?: string | null;
  kategori_id?: number | null;
  kategori?: { id: number; nama_kategori: string } | null;
  penulis_id?: string | null;
  penulis_nama?: string | null;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BeritaFormState = {
  status: 'idle' | 'error' | 'success';
  data?: News;
  errors?: {
    id?: string[];
    judul?: string[];
    kategori_id?: string[];
    tags?: string[];
    status?: string[];
    created_at?: string[];
    gambar_url?: string[];
    _form?: string[];
  };
};
