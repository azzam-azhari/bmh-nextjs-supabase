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

// Ganti nama komponen lokal agar tidak bentrok
const CountryFlagIcon = ({ countryCode }: { countryCode: string }) => {
    const getFlagEmoji = (code: string) => {
        const codePoints = code
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        <span className="mr-2 text-lg" aria-label={`Flag of ${countryCode}`}>
            {getFlagEmoji(countryCode)}
        </span>
    );
};

export default function LanguageSwitcher() {
    const [activeLocale, setActiveLocale] = useState('id'); // Sekarang useState dikenali

    const languages = [
        { code: 'id', name: 'Indonesia', flag: 'ID' },
        { code: 'en', name: 'English', flag: 'GB' },
        { code: 'ar', name: 'العربية', flag: 'SA' },
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
                            <CountryFlagIcon countryCode={currentLang.flag} /> {/* Gunakan nama yang baru */}
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
                        <CountryFlagIcon countryCode={lang.flag} /> {/* Gunakan nama yang baru */}
                        {lang.name} ({lang.code.toUpperCase()})
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}