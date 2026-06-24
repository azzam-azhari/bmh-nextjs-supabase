'use client';

import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import DropdownNewsAction from '@/components/common/dropdown-news-action';
import { News } from '@/types/general';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeftDoubleIcon, ArrowLeft01Icon, ArrowRight01Icon, ArrowRightDoubleIcon, PencilEdit01Icon, Delete02Icon, ViewIcon,
  CheckmarkCircle01Icon,
  Loading03Icon,
  SentIcon,
  Cancel01Icon,
  Edit01Icon,
} from "@hugeicons/core-free-icons"

// ✅ Header sesuai kolom tabel News
const HEADERS = ["No", "Judul", "Autor", "Kategori", "Tags", "Dibuat Pada", "Status", "Action"];

// ✅ Skeleton width disesuaikan per kolom News
const SKELETON_WIDTHS = ['w-7', 'w-48', 'w-40', 'w-12', 'w-28', 'w-8'];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "published":
      return (
        <Badge variant="outline" className="gap-1 px-1.5 text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-950">
          <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="size-3 fill-emerald-500/20" />
          Published
        </Badge>
      )
    case "draft":
      return (
        <Badge variant="outline" className="gap-1 px-1.5 text-muted-foreground">
          <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} className="size-3" />
          Draft
        </Badge>
      )
    case "archived":
      return (
        <Badge variant="outline" className="gap-1 px-1.5 text-amber-600 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-950">
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
          Archived
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="px-1.5 text-muted-foreground capitalize">
          {status}
        </Badge>
      )
  }
}

export default function DataTableNewsFix({
  data = [],
  isLoading,
  onEdit,
  onDelete,
}: {
  data: News[];
  isLoading?: boolean;
  onEdit?: (category: News) => void;
  onDelete?: (category: News) => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = data.length;
  const pageCount = Math.ceil(totalItems / pageSize) || 1;
  const safePageIndex = Math.max(0, Math.min(pageIndex, pageCount - 1));

  const paginatedData = data.slice(
    safePageIndex * pageSize,
    (safePageIndex + 1) * pageSize
  );

  // ✅ Format tanggal ke bahasa Indonesia
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  return (
    <div className="w-full flex-col justify-start gap-6 px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              {HEADERS.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {HEADERS.map((_, colIndex) => (
                    <TableCell key={`skeleton-col-${rowIndex}-${colIndex}`}>
                      <Skeleton className={`h-5 ${SKELETON_WIDTHS[colIndex] ?? 'w-20'} rounded-md`} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell>{safePageIndex * pageSize + rowIndex + 1}</TableCell>

                  {/* Kolom Judul - DIBATASI, RESPONSIF */}
                  <TableCell className="max-w-[170px] sm:max-w-[200px] md:max-w-[250px]">
                    <span className="line-clamp-2">{row.judul}</span>
                  </TableCell>

                  {/* <TableCell className="text-muted-foreground max-w-[80px] truncate" title={row.penulis_id || undefined}>{row.penulis_id || '-'}</TableCell> */}
                  <TableCell
                    className="text-muted-foreground max-w-[80px] truncate"
                    title={row.penulis_nama || undefined}
                  >
                    {row.penulis_nama || '-'}
                  </TableCell>
                  <TableCell className="max-w-[100px] truncate" title={row.kategori?.nama_kategori || undefined}>{row.kategori?.nama_kategori || '-'}</TableCell>

                  {/* Kolom Tags - DIBATASI, RESPONSIF */}
                  <TableCell className="max-w-[100px] sm:max-w-[150px] break-words">
                    {row.tags?.join(", ") || '-'}
                  </TableCell>

                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                  <TableCell>
                    {/* Dropdown bisa diubah menjadi tombol ikon di layar kecil */}
                    <DropdownNewsAction
                      menu={[
                        {
                          label: (
                            <span className="flex items-center gap-2">
                              <HugeiconsIcon icon={ViewIcon} size={16} />
                              View
                            </span>
                          ),
                          action: () => console.log('View', row),
                        },
                        {
                          label: (
                            <span className="flex items-center gap-2">
                              <HugeiconsIcon icon={PencilEdit01Icon} size={16} />
                              Edit
                            </span>
                          ),
                          action: () => onEdit?.(row),
                        },
                        { type: 'separator' },
                        {
                          label: (
                            <span className="flex items-center gap-2">
                              <HugeiconsIcon icon={Delete02Icon} className="text-red-400" size={16} />
                              Delete
                            </span>
                          ),
                          variant: 'destructive',
                          action: () => onDelete?.(row),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={HEADERS.length} className="h-24 text-center">
                  No Result Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end pt-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page-category" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${pageSize}`}
              onValueChange={(val) => { setPageSize(Number(val)); setPageIndex(0); }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page-category">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPageIndex(0)} disabled={safePageIndex === 0}>
              <span className="sr-only">Go to first page</span>
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} strokeWidth={2} />
            </Button>
            <Button variant="outline" className="size-8" size="icon"
              onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={safePageIndex === 0}>
              <span className="sr-only">Go to previous page</span>
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Button>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {safePageIndex + 1} of {pageCount}
            </div>
            <Button variant="outline" className="size-8" size="icon"
              onClick={() => setPageIndex((prev) => Math.min(pageCount - 1, prev + 1))}
              disabled={safePageIndex >= pageCount - 1}>
              <span className="sr-only">Go to next page</span>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
            <Button variant="outline" className="hidden size-8 lg:flex" size="icon"
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={safePageIndex >= pageCount - 1}>
              <span className="sr-only">Go to last page</span>
              <HugeiconsIcon icon={ArrowRightDoubleIcon} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}