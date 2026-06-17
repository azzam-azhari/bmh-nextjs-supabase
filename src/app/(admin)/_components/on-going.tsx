import Link from 'next/link';
import { HugeiconsIcon } from "@hugeicons/react";
import { ConstructionIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OnGoing() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height)-2rem)] w-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-foreground/10 bg-background/50 backdrop-blur-md text-center shadow-lg">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HugeiconsIcon icon={ConstructionIcon} className="h-6 w-6"  />
          </div>
          <CardTitle className="text-xl font-bold">Dalam Pengembangan</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-2">
            Halaman ini sedang dalam proses pengerjaan. Silakan kembali lagi nanti.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center pb-8 pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">
              <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4"  /> Kembali ke Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
