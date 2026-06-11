// app/(public)/layout.tsx
import type { Metadata } from 'next';
import Navbar from '@/app/(public)/_components/navbar';
import Footer from '@/app/(public)/_components/footer';

export const metadata: Metadata = {
    title: {
        default: 'Baitul Maal Hidayatullah',
        template: '%s | Baitul Maal Hidayatullah',
    },
    description: 'Portal berita resmi BMH - Menyajikan informasi terkini, riset, dan pengembangan',
    keywords: ['BMH', 'berita', 'riset', 'pengembangan', 'portal berita'],
    authors: [{ name: 'BMH' }],
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        siteName: 'BMH',
    },
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}