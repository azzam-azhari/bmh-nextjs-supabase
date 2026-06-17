'use client';

import * as React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon, ComputerIcon } from "@hugeicons/core-free-icons";

import { useTheme } from '@teispace/next-themes';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9 opacity-50 pointer-events-none">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 bg-background/50 backdrop-blur-md border-border/50 hover:bg-accent/50 transition-all duration-300">
          <HugeiconsIcon icon={Sun01Icon} className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-foreground"  />
          <HugeiconsIcon icon={Moon01Icon} className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-foreground"  />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 backdrop-blur-md bg-background/80">
        <DropdownMenuItem onClick={() => setTheme('light')} className={theme === 'light' ? 'bg-accent/50 font-medium' : ''}>
          <HugeiconsIcon icon={Sun01Icon} className="mr-2 h-4 w-4 text-foreground"  />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className={theme === 'dark' ? 'bg-accent/50 font-medium' : ''}>
          <HugeiconsIcon icon={Moon01Icon} className="mr-2 h-4 w-4 text-foreground"  />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className={theme === 'system' ? 'bg-accent/50 font-medium' : ''}>
          <HugeiconsIcon icon={ComputerIcon} className="mr-2 h-4 w-4 text-foreground"  />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
