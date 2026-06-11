// components/public/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">BMH</h3>
                        <p className="text-sm text-muted-foreground">
                            Portal berita resmi yang menyajikan informasi terkini, riset, dan pengembangan.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Navigasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/berita" className="text-muted-foreground transition-colors hover:text-primary">
                                    Berita
                                </Link>
                            </li>
                            <li>
                                <Link href="/riset" className="text-muted-foreground transition-colors hover:text-primary">
                                    Riset
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang" className="text-muted-foreground transition-colors hover:text-primary">
                                    Tentang Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Kontak</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Email: info@bmh.id</li>
                            <li>Telp: (021) 1234-5678</li>
                            <li>Alamat: Jakarta, Indonesia</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Ikuti Kami</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                                Facebook
                            </a>
                            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                                Twitter
                            </a>
                            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} BMH. Hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}