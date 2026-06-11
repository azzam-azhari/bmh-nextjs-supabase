// app/(public)/layout.tsx
import type { Metadata, Viewport } from 'next';
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
        url: 'https://bmh.or.id',
        images: [
            {
                url: '/bmh.jpg',
                width: 1200,
                height: 630,
                alt: 'Logo BMH',
            },
        ],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" suppressHydrationWarning>
            {/* Tambahkan suppressHydrationWarning ke <body> untuk mencegah peringatan mismatch */}
            <body className="flex min-h-screen flex-col bg-background text-foreground" suppressHydrationWarning>
                <Navbar />
                {/* Main area fleksibel yang mengambil ruang kosong */}
                {/* Menyesuaikan padding dan lebar maksimum untuk layar besar */}
                <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}