export const HEADER_TABLE_CATEGORY = ['No', 'Nama Kategori', 'Slug', 'Jumlah', 'Dibuat Pada', 'Action'];

export const INITIAL_CREATE_CATEGORY_FORM = {
    nama_kategori: '',
    slug: '',
    jumlah: 0,
};

export const INITIAL_STATE_CREATE_CATEGORY = {
    status: 'idle',
    errors: {
        nama_kategori: [],
        slug: [],
        jumlah: [],
        _form: [],
    },
};

export const INITIAL_STATE_UPDATE_CATEGORY = {
    status: 'idle',
    errors: {
        nama_kategori: [],
        slug: [],
        jumlah: [],
        _form: [],
    },
};