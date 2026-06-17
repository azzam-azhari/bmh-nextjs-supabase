// components/public/Footer.tsx
import Link from 'next/link';
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Call02Icon, Location01Icon, Facebook01Icon, NewTwitterIcon, InstagramIcon, YoutubeIcon } from "@hugeicons/core-free-icons";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            {/* mx-auto membatasi lebar maksimal di monitor ultrawide */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

                {/* Top Section: Newsletter & Brand */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-12 pb-10 border-b">
                    <div className="space-y-4 text-left max-w-md">
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">BMH</h3>
                        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                            Portal berita resmi yang menyajikan informasi terkini, riset, dan pengembangan untuk Indonesia dan Dunia.
                        </p>
                    </div>

                    <div className="space-y-4 text-left lg:text-right">
                        <h4 className="text-sm lg:text-base font-semibold">Berlangganan Newsletter</h4>
                        <p className="text-sm lg:text-base text-muted-foreground">
                            Dapatkan berita terbaru langsung di inbox Anda.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 lg:justify-end items-stretch sm:items-center">
                            <Input
                                type="email"
                                placeholder="Alamat email Anda"
                                className="w-full sm:w-64 lg:w-72 bg-background"
                            />
                            <Button size="sm" className="w-full sm:w-auto whitespace-nowrap">
                                Berlangganan
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
                    <div className="space-y-4">
                        <h4 className="text-sm lg:text-base font-semibold">Navigasi</h4>
                        <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                            <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">Berita</Link></li>
                            <li><Link href="/research" className="text-muted-foreground hover:text-primary transition-colors">Riset</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Kontak</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm lg:text-base font-semibold">Kategori</h4>
                        <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base">
                            <li><Link href="/kategori/kemanusiaan" className="text-muted-foreground hover:text-primary transition-colors">Kemanusiaan</Link></li>
                            <li><Link href="/kategori/pendidikan" className="text-muted-foreground hover:text-primary transition-colors">Pendidikan</Link></li>
                            <li><Link href="/kategori/ekonomi" className="text-muted-foreground hover:text-primary transition-colors">Ekonomi</Link></li>
                            <li><Link href="/kategori/kesehatan" className="text-muted-foreground hover:text-primary transition-colors">Kesehatan</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm lg:text-base font-semibold">Kontak</h4>
                        <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground flex flex-col">
                            <li className="flex items-start gap-3">
                                <HugeiconsIcon icon={Location01Icon} className="h-5 w-5 mt-0.5 shrink-0"  />
                                <span className="leading-relaxed">Jl. Raya Condet No.3, Jakarta Timur, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <HugeiconsIcon icon={Call02Icon} className="h-5 w-5 shrink-0"  />
                                <span>(021) 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <HugeiconsIcon icon={Mail01Icon} className="h-5 w-5 shrink-0"  />
                                <span>redaksi@bmh.id</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm lg:text-base font-semibold">Ikuti Kami</h4>
                        <div className="flex gap-3">
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook">
                                <HugeiconsIcon icon={Facebook01Icon} className="h-5 w-5"  />
                            </a>
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Twitter">
                                <HugeiconsIcon icon={NewTwitterIcon} className="h-5 w-5"  />
                            </a>
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram">
                                <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5"  />
                            </a>
                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Youtube">
                                <HugeiconsIcon icon={YoutubeIcon} className="h-5 w-5"  />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 pt-8 border-t text-sm text-muted-foreground text-center md:text-left">
                    <p>© {new Date().getFullYear()} Baitul Maal Hidayatullah. Hak cipta dilindungi.</p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
                        <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}