// app/(auth)/layout.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Building01Icon } from "@hugeicons/core-free-icons";

import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-emerald-500 flex p-2 items-center justify-center rounded-md">
            <HugeiconsIcon icon={Building01Icon} className="size-4"  />
          </div>
          BMH
        </div>
        {children}
        <Toaster />
      </div>
    </div>
  );
}