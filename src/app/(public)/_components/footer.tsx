// components/public/Footer.tsx
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            {/* mx-auto membatasi lebar maksimal di monitor ultrawide */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">

                {/* Top Section: Newsletter & Brand */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 pb-12 lg:pb-16 border-b">
                    <div className="space-y-4 text-center lg:text-left">
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">BMH</h3>
                        <p className="text-sm lg:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Portal berita resmi yang menyajikan informasi terkini, riset, dan pengembangan untuk Indonesia dan Dunia.
                        </p>
                    </div>

                    <div className="space-y-4 text-center lg:text-right">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16 text-center sm:text-left">
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
                        <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground flex flex-col items-center sm:items-start">
                            <li className="flex items-start gap-2 justify-center sm:justify-start">
                                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                <span className="leading-relaxed">Jl. Raya Condet No.3, Jakarta Timur, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>(021) 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>redaksi@bmh.id</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm lg:text-base font-semibold">Ikuti Kami</h4>
                        <div className="flex gap-3 justify-center sm:justify-start">
                            <a href="#" className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook">
                                <FaFacebookF className="h-4 w-4 lg:h-5 lg:w-5" />
                            </a>
                            <a href="#" className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Twitter">
                                <FaTwitter className="h-4 w-4 lg:h-5 lg:w-5" />
                            </a>
                            <a href="#" className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram">
                                <FaInstagram className="h-4 w-4 lg:h-5 lg:w-5" />
                            </a>
                            <a href="#" className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Youtube">
                                <FaYoutube className="h-4 w-4 lg:h-5 lg:w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-6 pt-8 lg:pt-12 border-t text-sm lg:text-base text-muted-foreground text-center md:text-left">
                    <p>© {new Date().getFullYear()} Baitul Maal Hidayatullah. Hak cipta dilindungi.</p>
                    <div className="flex flex-wrap justify-center gap-x-4 lg:gap-x-6 gap-y-2">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
                        <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}