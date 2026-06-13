// app/(public)/layout.tsx
import type { Metadata, Viewport } from 'next';
import Navbar from '@/app/(public)/_components/navbar';
import Footer from '@/app/(public)/_components/footer';
import { ForceLightMode } from '@/app/(public)/_components/force-light-mode'; // <-- Import komponen baru
import Home from './page';

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
        <>
            <ForceLightMode />
            {/* JANGAN gunakan <html> dan <body> di sini. Gunakan div wrapper */}
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Navbar />

                <main className="">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}