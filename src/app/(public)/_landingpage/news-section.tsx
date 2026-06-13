import Link from 'next/link';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { ArrowRight, Calendar } from 'lucide-react';
// import { latestNews } from '@/lib/db';
import { ArrowRight, Calendar } from 'lucide-react';

// Data dummy untuk 3 berita terbaru
const latestNews = [
    {
        id: 1,
        title: 'BMH Salurkan Bantuan Kemanusiaan untuk Korban Banjir di Kalimantan',
        category: 'Kemanusiaan',
        date: '10 Juni 2026',
        excerpt: 'Baitul Maal Hidayatullah kembali hadir di tengah masyarakat dengan menyalurkan bantuan logistik dan kebutuhan pokok bagi para pengungsi.',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
    },
    {
        id: 2,
        title: 'Program Beasiswa Cendekia: Membangun Generasi Emas Indonesia',
        category: 'Pendidikan',
        date: '08 Juni 2026',
        excerpt: 'Ribuan santri dan pelajar dari keluarga kurang mampu kini bisa melanjutkan pendidikan hingga ke perguruan tinggi terbaik.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    },
    {
        id: 3,
        title: 'Layanan Kesehatan Gratis BMH Menjangkau Pelosok Desa',
        category: 'Kesehatan',
        date: '05 Juni 2026',
        excerpt: 'Pemeriksaan kesehatan gratis, pemberian obat, dan edukasi pola hidup sehat dilakukan secara door-to-door di daerah terpencil.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    },
];


export default function NewsSection() {
    return (
        <section className="py-5 sm:py-6 md:py-12 lg:py-12 xl:py-20 bg-background ">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 xl:px-12"> {/* Menambahkan xl:px-12 untuk ruang sisi ekstra di layar besar */}

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 lg:mb-16">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-xs sm:text-sm lg:text-base">Berita Terbaru</Badge>
                        {/* Menyesuaikan ukuran heading untuk xl */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            Update Terkini dari BMH
                        </h2>
                        <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
                            Informasi terbaru seputar kegiatan dan program kami
                        </p>
                    </div>
                    {/* Menyesuaikan ukuran tombol untuk xl */}
                    <Button variant="outline" className="w-full sm:w-auto gap-2 text-sm sm:text-base lg:text-lg px-4 py-2 lg:px-5 lg:py-2.5" asChild>
                        <Link href="/news">
                            Lihat Semua Berita
                            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                        </Link>
                    </Button>
                </div>

                {/* News Grid */}
                {/* Menambahkan gap yang lebih besar untuk xl */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                    {latestNews.map((news) => (
                        <Card key={news.id} className="flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">

                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <Badge className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-background/90 backdrop-blur-sm hover:bg-background/90 text-xs sm:text-sm lg:text-base">
                                    {news.category}
                                </Badge>
                            </div>

                            {/* Content */}
                            <CardHeader className="flex-1 p-4 sm:p-5 lg:p-6">
                                {/* Menyesuaikan ukuran judul untuk xl */}
                                <CardTitle className="text-lg sm:text-xl lg:text-2xl line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                    <Link href={`/news/${news.id}`} className="hover:underline">
                                        {news.title}
                                    </Link>
                                </CardTitle>
                                {/* Menyesuaikan ukuran deskripsi untuk xl */}
                                <CardDescription className="text-sm sm:text-base lg:text-lg line-clamp-2 mt-2">
                                    {news.excerpt}
                                </CardDescription>
                            </CardHeader>

                            {/* Footer */}
                            <CardFooter className="border-t pt-3 pb-4 px-4 sm:px-5 lg:px-6">
                                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                                    <span>{news.date}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}