"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ErrorProps {
    code: string;
    title: string;
    message: string;
}

export default function ErrorHandle({ code, title, message }: ErrorProps) {
    const router = useRouter();
    return (
        <div className="flex h-screen flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold">{code}</h1>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            <p className="mt-4 text-muted-foreground">{message}</p>
            <Button variant="outline" className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground" onClick={() => router.push('/')}>
                Kembali ke Beranda
            </Button>
        </div>
    );
}