import type { BeritaFormState } from '@/types/berita';
import type { UpdateBeritaForm } from '@/validations/berita-validation';

export const INITIAL_UPDATE_BERITA_FORM: UpdateBeritaForm = {
  judul: '',
  kategori_id: '',
  tags: '',
  status: 'draft',
  created_at: '',
  gambar_url: '',
};

export const INITIAL_STATE_UPDATE_BERITA: BeritaFormState = {
  status: 'idle',
  errors: {
    id: [],
    judul: [],
    gambar_url: [],
    kategori_id: [],
    tags: [],
    status: [],
    created_at: [],
    _form: [],
  },
};
