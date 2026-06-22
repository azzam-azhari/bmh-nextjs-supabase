'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalCircle01Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Aplikasi</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = item.url === '/'
            ? pathname === item.url
            : item.url !== '#' && pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive} onClick={() => setOpenMobile(false)}>
                <Link href={item.url}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction asChild showOnHover>
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
                  <span className="sr-only">Open in new tab</span>
                </Link>
              </SidebarMenuAction>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
