'use client';

import * as React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export default function DashboardBreadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getLabel = (segment: string) => {
    if (segment === 'dashboard') return 'Dashboard';
    if (segment === 'user-management') return 'User Management';
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        {/* Jika halaman aktif bukan dashboard, tambahkan breadcrumb "Dashboard" di awal sebagai link */}
        {segments[0] !== 'dashboard' && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {/* Render sisa segmen path */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = '/' + segments.slice(0, index + 1).join('/');
          const label = getLabel(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
