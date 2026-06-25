export type formState = {
  errors?: {
    _form?: string[];
  };
  status?: string;
};

export type Preview = {
  file?: File
  displayUrl: string
}

export type Category = {
  id: number;
  nama_kategori: string;
  slug: string;
  jumlah: number;
  created_at: string;
};

export type News = {
  id: number;
  judul: string;
  slug: string;
  isi_berita: string | null;
  gambar_url: string[];
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