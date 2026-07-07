export type formState = {
  errors?: {
    _form?: string[];
  };
  status?: string;
};

// types preview
export type Preview = {
  file?: File
  displayUrl: string
}

// types category management
export type Category = {
  id: number;
  nama_kategori: string;
  slug: string;
  jumlah: number;
  created_at: string;
};

// types all news
export type News = {
  id: number;
  judul: string;
  slug: string;
  isi_berita: string | null;
  gambar_url: string | null;
  kategori_id: number | null;
  kategori?: { id: number; nama_kategori: string } | null;
  penulis_id: string | null;
  penulis_nama: string | null;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
};