import ErrorHandle from '@/app/_components/error-handle';

export default function NotFound() {
    return (
        <ErrorHandle
            code="404"
            title="Halaman Tidak Ditemukan"
            message="Maaf, rute URL yang kamu tuju tidak tersedia atau sudah dihapus."
        />
    );
}