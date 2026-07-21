import { HugeiconsIcon } from "@hugeicons/react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight01Icon, UserGroupIcon, EarthIcon, TrendingUp } from "@hugeicons/core-free-icons";



export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 sm:py-16">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">

                    {/* Badge */}
                    <Badge variant="secondary" className="px-3 py-1.5 text-xs sm:text-sm font-medium">
                        <HugeiconsIcon icon={TrendingUp} className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Portal Berita Resmi BMH
                    </Badge>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-7xl font-bold tracking-tight text-foreground max-w-3xl">
                        Aksi Nyata untuk{' '}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Indonesia dan Dunia
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        Menyajikan informasi terkini, riset, dan pengembangan dari Baitul Maal Hidayatullah
                        untuk membangun peradaban yang lebih baik.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <Button size="default" className="gap-2 text-sm sm:text-base px-5 py-5 lg:px-6 lg:py-6" asChild>
                            <Link href="/news">
                                Baca Berita Terbaru
                                <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="default" variant="outline" className="text-sm sm:text-base px-5 py-5 lg:px-6 lg:py-6" asChild>
                            <Link href="/tentang-kami">
                                Tentang BMH
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t w-full max-w-2xl">
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                <HugeiconsIcon icon={UserGroupIcon} className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                <span>10K+</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">Penerima Manfaat</p>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                <HugeiconsIcon icon={EarthIcon} className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                <span>34</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">Provinsi</p>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                <HugeiconsIcon icon={TrendingUp} className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                <span>500+</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">Program Aktif</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}