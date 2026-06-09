'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// ✅ HugeiconsIcon renderer dari @hugeicons/react
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
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'BMH',
      // Ganti string path dengan elemen img
      logo: <img src="/bmh.jpg" alt="Logo BMH" className="w-8 h-8 object-contain rounded-md" />, // Ganti className sesuai kebutuhan styling
      plan: 'Enterprise',
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
      url: '#',
      icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
      isActive: true,
      items: [],
    },
    {
      title: 'Manajemen Berita',
      url: '#',
      icon: <HugeiconsIcon icon={News01Icon} strokeWidth={2} />,
      items: [
        { title: 'Tambah Berita Baru', url: '#' },
        { title: 'Semua Berita', url: '#' },
        { title: 'Kategori Berita', url: '#' },
        { title: 'Komentar Publik', url: '#' },
      ],
    },
    {
      title: 'Riset & Pengembangan',
      url: '#',
      icon: <HugeiconsIcon icon={MicroscopeIcon} strokeWidth={2} />,
      items: [
        { title: 'Tambah Riset', url: '#' },
        { title: 'Semua Riset', url: '#' },
      ],
    },
    {
      title: 'Majalah Mulia',
      url: '#',
      icon: <HugeiconsIcon icon={BookOpen02Icon} strokeWidth={2} />,
      items: [
        { title: 'Tambah Majalah Baru', url: '#' },
        { title: 'Arsip Majalah', url: '#' },
      ],
    },
    {
      title: 'Manajemen Artikel',
      url: '#',
      icon: <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />,
      items: [
        { title: 'Tambah Artikel', url: '#' },
        { title: 'Semua Artikel', url: '#' },
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
        { title: 'Manajemen User', url: '#' },
        { title: 'Hak Akses', url: '#' },
      ],
    },
  ],
  projects: [
    {
      name: 'Website Utama',
      url: '#',
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
