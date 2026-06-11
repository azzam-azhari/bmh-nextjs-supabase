// components/public/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Pastikan Anda memiliki cn dari shadcn (lib/utils.ts)
import LanguageSwitcher from './language-switcher';

// import { LanguageSwitcher } from './LanguageSwitcher'; // Uncomment jika sudah dibuat

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/news', label: 'Berita' },
    { href: '/research', label: 'Riset' },
    { href: '/about', label: 'Tentang' },
    { href: '/contact', label: 'Kontak' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Untuk mendeteksi halaman aktif

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* mx-auto membatasi lebar maksimal di monitor ultrawide */}
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo & Mobile Menu Trigger */}
                <div className="flex items-center gap-4">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" aria-label="Toggle menu" className="h-10 w-10">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0 flex flex-col">
                            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>

                            {/* Mobile Header */}
                            <div className="border-b p-6 flex flex-col gap-4"> {/* Tambahkan flex-col dan gap untuk tata letak vertikal */}
                                <div className="flex justify-between items-start"> {/* Bungkus logo dan tombol tutup jika ada */}
                                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                        <span className="text-xl font-bold tracking-tight">BMH</span>
                                    </Link>
                                    {/* Opsional: Tombol Tutup Sheet di pojok kanan atas header */}
                                    {/* <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Close menu"
                                        className="h-8 w-8"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X className="h-4 w-4" /> 
                                    </Button> */}
                                </div>
                                {/* Tempatkan LanguageSwitcher di sini */}
                                <div className="mt-2"> {/* Beri sedikit margin atas jika perlu */}
                                    <LanguageSwitcher />
                                </div>
                            </div>

                            {/* Mobile Nav Links */}
                            <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors hover:bg-accent",
                                                isActive ? "bg-accent text-primary font-semibold" : "text-muted-foreground"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Mobile Footer */}
                            <div className="border-t p-4 mt-auto">
                                <Button variant="outline" className="w-full justify-center gap-2 h-11" asChild>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <User className="h-4 w-4" /> Masuk / Daftar
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Desktop Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight lg:text-2xl">BMH</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2 lg:gap-6 xl:gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm lg:text-base font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
                    <Button variant="ghost" size="icon" aria-label="Search" className="h-9 w-9 lg:h-10 lg:w-10">
                        <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                    </Button>

                    {/* Language Switcher - Sekarang ditempatkan langsung di div actions */}
                    <LanguageSwitcher />

                    <Button size="sm" className="hidden md:flex h-9 lg:h-10 px-4 lg:px-6 text-xs lg:text-sm" asChild>
                        <Link href="/login">Masuk</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}