// app/(auth)/layout.tsx
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Building } from 'lucide-react';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center gap-2 self-center font-medium">
            <div className="bg-emerald-500 flex p-2 items-center justify-center rounded-md">
              <Building className="size-4" />
            </div>
            BMH
          </div>
          {children}
          <Toaster /> {/* Toaster kini hanya aktif di auth */}
        </div>
      </div>
    </ThemeProvider>
  );
}