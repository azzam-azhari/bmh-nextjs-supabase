'use client';

import Link from 'next/link';
import { Wrench, RefreshCw } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Maintenance() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height)-2rem)] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-foreground/10 bg-background/50 backdrop-blur-md text-center shadow-lg">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <Wrench className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Pemeliharaan Sistem</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Kami sedang melakukan peningkatan sistem berkala. Mohon maaf atas ketidaknyamanan Anda.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center pb-8 pt-2">
          <Button size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Perbarui Halaman
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
