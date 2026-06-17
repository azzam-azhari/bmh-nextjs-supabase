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