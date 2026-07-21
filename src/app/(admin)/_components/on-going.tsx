"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { ConstructionIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function OnGoing() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height)-2rem)] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-foreground/10 bg-background/50 backdrop-blur-md text-center shadow-lg">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HugeiconsIcon icon={ConstructionIcon} className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Dalam Pengembangan</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Halaman ini sedang dalam proses pengerjaan. Silakan kembali lagi nanti.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center pb-8 pt-2">
          <Button variant="outline" size="sm" className="pr-6" onClick={() => router.back()}>
            <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" /> Kembali
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
