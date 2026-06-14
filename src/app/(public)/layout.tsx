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
    description: 'Lembaga Amil Zakat Nasional Baitul Maal Hidayatullah',
    keywords: ['BMH', 'berita', 'Zakat', 'Infaq', 'Sedekah', 'Baitul Maal Hidayatullah', 'LAZ', 'ZISWAF', 'filantropi', 'sedekah online', 'donasi online', 'filantropi Islam'],
    authors: [{ name: 'Baitul Maal Hidayatullah' }],
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        siteName: 'Baitul Maal Hidayatullah',
        url: 'https://bmh-one.vercel.app',
        // url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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