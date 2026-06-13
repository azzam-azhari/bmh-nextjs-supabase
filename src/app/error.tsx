'use client'; // File error.tsx di Next.js wajib berupa Client Component

import ErrorHandle from '@/app/_components/error-handle';

export default function Error({ error }: { error: Error }) {
    return (
        <ErrorHandle
            code="500"
            title="Terjadi Kesalahan"
            // Menampilkan pesan error asli dari sistem (dinamis)
            message={error.message || "Sistem mengalami kendala saat memproses permintaanmu."}
        />
    );
}