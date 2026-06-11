// src/app/(public)/_components/language-switcher.tsx
import { Languages } from 'lucide-react'; // Hapus FlagIcon dari sini
import { useState } from 'react'; // Tambahkan import ini
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Komponen untuk menampilkan gambar bendera
const CountryFlagImage = ({ countryCode, altText }: { countryCode: string, altText: string }) => {
    // Sesuaikan path ini dengan struktur folder Anda di /public
    // Misalnya, jika Anda menyimpannya di /public/flags/id.jpg
    // const imagePath = `/flags/${countryCode.toLowerCase()}.jpg`;
    // Atau jika langsung di /public
    const imagePath = `/${countryCode.toLowerCase()}.jpg`;

    return (
        <img
            src={imagePath}
            alt={altText}
            className="mr-2 h-4 w-4 object-cover rounded-sm" // Sesuaikan ukuran dan styling
            onError={(e) => {
                // Opsional: fallback jika gambar gagal dimuat
                e.currentTarget.style.display = 'none'; // Sembunyikan placeholder gambar
                // Atau tampilkan teks alternatif
                // e.currentTarget.outerHTML = `<span>${altText.charAt(0)}</span>`;
            }}
        />
    );
};

export default function LanguageSwitcher() {
    const [activeLocale, setActiveLocale] = useState('id'); // Sekarang useState dikenali

    const languages = [
        { code: 'id', name: 'Indonesia', flag: 'id', alt: 'Flag of Indonesia' }, // Ubah flag ke lowercase
        { code: 'en', name: 'English', flag: 'eng', alt: 'Flag of United Kingdom' }, // Ubah flag ke nama file
        { code: 'ar', name: 'العربية', flag: 'ar', alt: 'Flag of Saudi Arabia' }, // Ubah flag ke nama file
    ];

    const currentLang = languages.find(lang => lang.code === activeLocale);

    const handleLanguageChange = (locale: string) => {
        setActiveLocale(locale);
        console.log(`Switching language to: ${locale}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 h-9 lg:h-10 text-xs lg:text-sm">
                    <Languages className="h-4 w-4 mr-1" />
                    {currentLang ? (
                        <>
                            <CountryFlagImage countryCode={currentLang.flag} altText={currentLang.alt} /> {/* Gunakan komponen gambar */}
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
                        className="cursor-pointer"
                    >
                        <CountryFlagImage countryCode={lang.flag} altText={lang.alt} /> {/* Gunakan komponen gambar */}
                        {lang.name} ({lang.code.toUpperCase()})
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}