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
import { ArrowLeftDoubleIcon, ArrowLeft01Icon, ArrowRight01Icon, ArrowRightDoubleIcon, PencilEdit01Icon, Delete02Icon } from "@hugeicons/core-free-icons";

import DropdownAction from '@/components/common/dropdown-action';

import { Category } from '@/types/general';

// ✅ Header sesuai kolom tabel
const HEADERS = ["No", "Nama Kategori", "Slug", "Jumlah", "Dibuat Pada", "Action"];

// ✅ Skeleton width disesuaikan per kolom
const SKELETON_WIDTHS = ['w-7', 'w-48', 'w-40', 'w-12', 'w-28', 'w-8'];

export default function DataTableCategory({
  data = [],
  isLoading,
  onEdit,
  onDelete,
}: {
  data: Category[];
  isLoading?: boolean;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

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
    <div className="w-full flex-col justify-start gap-6">
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
              // ✅ Render tiap kolom dari Kategori secara eksplisit
              paginatedData.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  <TableCell>{safePageIndex * pageSize + rowIndex + 1}</TableCell>
                  <TableCell>{row.nama_kategori}</TableCell>
                  <TableCell className="text-muted-foreground">{row.slug}</TableCell>
                  <TableCell>{row.jumlah}</TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>
                    <DropdownAction
                      menu={[
                        {
                          label: (
                            <span className="flex items-center gap-2">
                              <HugeiconsIcon icon={PencilEdit01Icon} size={16}  />
                              Edit
                            </span>
                          ),
                          action: () => onEdit?.(row),
                        },
                        {
                          label: (
                            <span className="flex items-center gap-2">
                              <HugeiconsIcon icon={Delete02Icon} className="text-red-400" size={16}  />
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
                  {[5, 10, 20, 30, 40, 50].map((size) => (
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