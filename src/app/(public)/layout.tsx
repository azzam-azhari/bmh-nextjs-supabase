// app/(public)/layout.tsx
import type { Metadata, Viewport } from 'next';
import Navbar from '@/app/(public)/_components/navbar';
import Footer from '@/app/(public)/_components/footer';
import { ForceLightMode } from '@/app/(public)/_components/force-light-mode';

export const metadata: Metadata = {
    title: {
        default: 'Baitul Maal Hidayatullah',
        template: '%s | Baitul Maal Hidayatullah',
    },
    description: 'Lembaga Amil Zakat Nasional Baitul Maal Hidayatullah',
    keywords: ['BMH', 'berita', 'Zakat', 'Infaq', 'Sedekah', 'Baitul Maal Hidayatullah', 'LAZ', 'ZISWAF', 'filantropi', 'sedekah online', 'donasi online', 'filantropi Islam', 'program BMH', 'kegiatan BMH', 'program amal', 'amal BMH', 'amal online', 'donasi BMH', 'donasi online', 'Program BMH', 'Kegiatan BMH', 'Program Amal', 'Amal BMH', 'Amal Online', 'Donasi BMH', 'Donasi Online', 'program zakat', 'program infaq', 'program sedekah', 'program amal', 'program beasiswa', 'program kemanusiaan', 'program lingkungan', 'program peduli', 'program bantuan', 'program bantuan bencana', 'program bantuan umkm', 'program bantuan pendidikan', 'program bantuan kesehatan', 'program bantuan yatim', 'program bantuan dhuafa', 'program bantuan fakir', 'program bantuan miskin', 'program bantuan yatim piatu', 'program bantuan dhuafa fakir', 'program bantuan yatim piatu fakir', 'program bantuan yatim piatu dhuafa', 'program bantuan yatim piatu dhuafa fakir'],
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
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Navbar />

                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}