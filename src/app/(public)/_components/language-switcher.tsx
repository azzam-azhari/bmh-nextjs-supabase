'use client';

import { useState } from 'react';
import Image from 'next/image'; // 1. Import next/image
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// 2. Komponen untuk menampilkan gambar bendera menggunakan next/image
const CountryFlagImage = ({ src, altText }: { src: string; altText: string }) => {
    return (
        <Image
            src={src}
            alt={altText}
            width={20}
            height={20}
            className="mr-2 h-5 w-5 object-cover rounded-sm border-1 border-gray-200"
            onError={(e) => {
                // Fallback: sembunyikan gambar jika path salah atau file tidak ada
                e.currentTarget.style.display = 'none';
            }}
        />
    );
};

export default function LanguageSwitcher() {
    const [activeLocale, setActiveLocale] = useState('id');

    // Pastikan nama file di array ini SAMA PERSIS dengan file di folder /public
    const languages = [
        { code: 'id', name: 'Indonesia', flag: '/flag/id.png', alt: 'Flag of Indonesia' },
        { code: 'eng', name: 'English', flag: '/flag/eng.png', alt: 'Flag of United Kingdom' },
        { code: 'arb', name: 'العربية', flag: '/flag/ar.png', alt: 'Flag of Saudi Arabia' },
    ];

    const currentLang = languages.find(lang => lang.code === activeLocale);

    const handleLanguageChange = (locale: string) => {
        setActiveLocale(locale);
        console.log(`Switching language to: ${locale}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2 h-9 lg:h-10 text-xs lg:text-sm border">
                    {currentLang ? (
                        <>
                            <CountryFlagImage src={currentLang.flag} altText={currentLang.alt} />
                            {currentLang.code.toUpperCase()}
                        </>
                    ) : 'Lang'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="cursor-pointer flex items-center" // 3. Tambahkan flex items-center agar icon dan teks sejajar vertikal
                    >
                        <CountryFlagImage src={lang.flag} altText={lang.alt} />
                        {lang.name} ({lang.code.toUpperCase()})
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}