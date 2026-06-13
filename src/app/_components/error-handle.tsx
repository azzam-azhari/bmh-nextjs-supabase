import Link from 'next/link';

interface ErrorProps {
    code: string;
    title: string;
    message: string;
}

export default function ErrorHandle({ code, title, message }: ErrorProps) {
    return (
        <div className="flex h-screen flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold">{code}</h1>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            <p className="mt-4 text-muted-foreground">{message}</p>
            <Link href="/" className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground">
                Kembali ke Beranda
            </Link>
        </div>
    );
}