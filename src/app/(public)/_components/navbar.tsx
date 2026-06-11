// components/public/Navbar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">BMH</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                            Beranda
                        </Link>
                        <Link href="/berita" className="text-sm font-medium transition-colors hover:text-primary">
                            Berita
                        </Link>
                        <Link href="/riset" className="text-sm font-medium transition-colors hover:text-primary">
                            Riset
                        </Link>
                        <Link href="/tentang" className="text-sm font-medium transition-colors hover:text-primary">
                            Tentang
                        </Link>
                        <Link href="/kontak" className="text-sm font-medium transition-colors hover:text-primary">
                            Kontak
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Masuk</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}