'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Calendar01Icon, UserIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";


// Data dummy untuk simulasi berita
const mockNews = [
    {
        id: 1,
        title: 'BMH Salurkan Bantuan Kemanusiaan untuk Korban Banjir di Kalimantan',
        category: 'Kemanusiaan',
        date: '10 Juni 2026',
        author: 'Tim Redaksi',
        excerpt: 'Baitul Maal Hidayatullah kembali hadir di tengah masyarakat dengan menyalurkan bantuan logistik dan kebutuhan pokok bagi para pengungsi.',
        image: 'bg-blue-500',
    },
    {
        id: 2,
        title: 'Program Beasiswa Cendekia: Membangun Generasi Emas Indonesia',
        category: 'Pendidikan',
        date: '08 Juni 2026',
        author: 'Divisi Pendidikan',
        excerpt: 'Ribuan santri dan pelajar dari keluarga kurang mampu kini bisa melanjutkan pendidikan hingga ke perguruan tinggi terbaik.',
        image: 'bg-emerald-500',
    },
    {
        id: 3,
        title: 'Layanan Kesehatan Gratis BMH Menjangkau Pelosok Desa',
        category: 'Kesehatan',
        date: '05 Juni 2026',
        author: 'Tim Medis',
        excerpt: 'Pemeriksaan kesehatan gratis, pemberian obat, dan edukasi pola hidup sehat dilakukan secara door-to-door di daerah terpencil.',
        image: 'bg-rose-500',
    },
    {
        id: 4,
        title: 'Pemberdayaan Ekonomi Umat Melalui Koperasi Syariah',
        category: 'Ekonomi',
        date: '01 Juni 2026',
        author: 'Divisi Ekonomi',
        excerpt: 'BMH meluncurkan program koperasi syariah untuk membantu UMKM dan pedagang kecil agar terhindar dari jeratan rentenir.',
        image: 'bg-amber-500',
    },
    {
        id: 5,
        title: 'Tanggap Darurat: BMH Kirim Tim Medis ke Zona Konflik',
        category: 'Darurat',
        date: '28 Mei 2026',
        author: 'Tim Disaster',
        excerpt: 'Tim medis dan relawan kemanusiaan BMH telah tiba di lokasi untuk memberikan pertolongan pertama dan evakuasi korban.',
        image: 'bg-purple-500',
    },
    {
        id: 6,
        title: 'Panen Raya Bersama Petani Binaan BMH di Jawa Tengah',
        category: 'Pertanian',
        date: '25 Mei 2026',
        author: 'Divisi Pertanian',
        excerpt: 'Program pertanian terpadu berhasil meningkatkan hasil panen petani binaan hingga 40% dibanding musim sebelumnya.',
        image: 'bg-lime-500',
    },
    {
        id: 7,
        title: 'Panen Raya Bersama Petani Binaan BMH di Jawa Tengah',
        category: 'Pertanian',
        date: '25 Mei 2026',
        author: 'Divisi Pertanian',
        excerpt: 'Program pertanian terpadu berhasil meningkatkan hasil panen petani binaan hingga 40% dibanding musim sebelumnya.',
        image: 'bg-lime-500',
    },
    {
        id: 8,
        title: 'Panen Raya Bersama Petani Binaan BMH di Jawa Tengah',
        category: 'Pertanian',
        date: '25 Mei 2026',
        author: 'Divisi Pertanian',
        excerpt: 'Program pertanian terpadu berhasil meningkatkan hasil panen petani binaan hingga 40% dibanding musim sebelumnya.',
        image: 'bg-lime-500',
    },
];

export default function News() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter sederhana untuk pencarian
    const filteredNews = mockNews.filter((news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 xl:px-12">

            {/* Header Section */}
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                    Aksi Nyata Baitul Maal Hidayatullah
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Terbaru dari BMH untuk Indonesia dan Dunia
                </p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-14">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"  />
                        <Input
                            placeholder="Cari berita atau kategori..."
                            className="pl-10 h-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button size="lg" className="h-11 px-8">
                        Cari Berita
                    </Button>
                </div>
            </div>

            {/* News Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                        <Card key={news.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                            {/* Image Placeholder (Ganti dengan <img> jika ada URL gambar) */}
                            <div className={`aspect-video w-full ${news.image} relative`}>
                                <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background/90">
                                    {news.category}
                                </Badge>
                            </div>

                            <CardHeader className="flex-1">
                                <CardTitle className="text-xl line-clamp-2 leading-tight">
                                    {news.title}
                                </CardTitle>
                                <CardDescription className="text-sm line-clamp-3 mt-2">
                                    {news.excerpt}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter className="border-t pt-4 flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <HugeiconsIcon icon={Calendar01Icon} className="h-3.5 w-3.5"  />
                                    <span>{news.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <HugeiconsIcon icon={UserIcon} className="h-3.5 w-3.5"  />
                                    <span className="line-clamp-1">{news.author}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Tidak ada berita yang ditemukan untuk "{searchQuery}".
                    </div>
                )}
            </div>

            {/* Pagination / Load More */}
            <div className="flex justify-center">
                <Button variant="outline" size="lg" className="gap-2">
                    Muat Lebih Banyak <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4"  />
                </Button>
            </div>

        </div>
    );
}