// components/force-light-mode.tsx
'use client';

import { useEffect } from 'react';

export function ForceLightMode() {
    useEffect(() => {
        // Paksa hapus class 'dark' dari tag <html> saat user masuk ke halaman public
        document.documentElement.classList.remove('dark');
    }, []);

    return null;
}