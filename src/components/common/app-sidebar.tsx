'use client';

import * as React from 'react';

import { NavMain } from '@/app/(admin)/_components/nav-main';
import { NavProjects } from '@/app/(admin)/_components/nav-projects';
import { NavUser } from '@/app/(admin)/_components/nav-user';
import { TeamSwitcher } from '@/app/(admin)/_components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { HugeiconsIcon } from '@hugeicons/react';

// ✅ Import yang benar — semua dari @hugeicons/core-free-icons
import {
  Settings05Icon,
  WebDesign01Icon,
  LayoutBottomIcon,
  AudioWave01Icon,
  CommandIcon,
  DashboardSquare01Icon,
  News01Icon,
  MicroscopeIcon,
  Edit01Icon,
  QuillWrite01Icon,
  CustomerService01Icon,
  BookOpen02Icon,
} from '@hugeicons/core-free-icons';

// Tambahkan import Image dari next/image jika ingin menggunakan komponen Image dari Next.js (lebih optimal)
// import Image from 'next/image';

const data = {
  teams: [
    {
      name: 'BMH',
      // Ganti string path dengan elemen img
      logo: <img src="/logo/bmh.jpg" alt="Logo BMH" className="size-full rounded-[inherit] object-cover" />,
      plan: 'Administrator',
    },
    {
      name: 'Acme Corp.',
      logo: <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: <HugeiconsIcon icon={CommandIcon} strokeWidth={2} />,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
      items: [],
    },
    {
      title: 'Manajemen Berita',
      url: '#',
      icon: <HugeiconsIcon icon={News01Icon} strokeWidth={2} />,
      items: [
        { title: 'Semua Berita', url: '/all-news' },
        { title: 'Tambah Berita Baru', url: '/add-news' },
        { title: 'Kategori Berita', url: '/categories' },
        { title: 'AllNews', url: '/allnews' },
      ],
    },
    {
      title: 'Riset & Pengembangan',
      url: '#',
      icon: <HugeiconsIcon icon={MicroscopeIcon} strokeWidth={2} />,
      items: [
        { title: 'Semua Riset', url: '#' },
        { title: 'Tambah Riset', url: '#' },
      ],
    },
    {
      title: 'Majalah Mulia',
      url: '#',
      icon: <HugeiconsIcon icon={BookOpen02Icon} strokeWidth={2} />,
      items: [
        { title: 'Arsip Majalah', url: '#' },
        { title: 'Tambah Majalah Baru', url: '#' },
      ],
    },
    {
      title: 'Manajemen Artikel',
      url: '#',
      icon: <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />,
      items: [
        { title: 'Semua Artikel', url: '#' },
        { title: 'Tambah Artikel', url: '#' },
        { title: 'Kategori Artikel', url: '#' },
      ],
    },
    {
      title: 'News Writing',
      url: '#',
      icon: <HugeiconsIcon icon={QuillWrite01Icon} strokeWidth={2} />,
      items: [
        { title: 'Draft Saya', url: '#' },
        { title: 'Kirim untuk Review', url: '#' },
      ],
    },
    {
      title: 'Pengaturan',
      url: '#',
      icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
      items: [
        { title: 'Manajemen User', url: '/user-management' },
        { title: 'Hak Akses', url: '/permissions' },
      ],
    },
  ],
  projects: [
    {
      name: 'Website Utama',
      url: '/news',
      icon: <HugeiconsIcon icon={WebDesign01Icon} strokeWidth={2} />,
    },
    {
      name: 'Care Center',
      url: '#',
      icon: <HugeiconsIcon icon={CustomerService01Icon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
