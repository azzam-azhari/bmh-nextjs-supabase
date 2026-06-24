import { ReactNode, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // <-- Import Skeleton
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftDoubleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons";

export default function DataTableUser({
  header,
  data = [],
  isLoading,
  totalItems,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: {
  header: string[];
  data: (string | ReactNode)[][];
  isLoading?: boolean;
  totalItems?: number;
  pageIndex?: number; // 0-indexed
  pageSize?: number;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}) {
  const [internalPageIndex, setInternalPageIndex] = useState(0);
  const [internalPageSize, setInternalPageSize] = useState(10);

  const isControlled = pageIndex !== undefined && onPageChange !== undefined;
  
  const currentSize = pageSize ?? internalPageSize;
  const currentIndex = isControlled ? pageIndex : internalPageIndex;

  const total = totalItems ?? data?.length ?? 0;
  const pageCount = Math.ceil(total / currentSize) || 1;

  // Reset pageIndex if it exceeds the new pageCount when data/pageSize changes
  const safePageIndex = Math.max(0, Math.min(currentIndex, pageCount - 1));

  const handlePageChange = (newIndex: number) => {
    if (isControlled && onPageChange) {
      onPageChange(newIndex);
    } else {
      setInternalPageIndex(newIndex);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    } else {
      setInternalPageSize(newSize);
      setInternalPageIndex(0);
    }
  };

  const paginatedData = isControlled ? data : data?.slice(
    safePageIndex * currentSize,
    (safePageIndex + 1) * currentSize
  ) || [];

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              {header.map((column) => (
                <TableHead key={`th-${column}`}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Logika render disesuaikan untuk Skeleton */}
            {isLoading ? (
              Array.from({ length: currentSize }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {header.map((_, colIndex) => {
                    // Tentukan lebar skeleton sesuai urutan kolom
                    // Contoh: kolom 1 kecil (w-12), kolom 2 sangat lebar (w-48), dst.
                    const skeletonWidths = ['w-7', 'w-48', 'w-40', 'w-12', 'w-7'];

                    // Ambil lebar dari array, jika kolom lebih banyak dari array, gunakan 'w-20' sebagai default
                    const currentWidth = skeletonWidths[colIndex] || 'w-20';

                    return (
                      <TableCell key={`skeleton-col-${rowIndex}-${colIndex}`}>
                        <Skeleton className={`h-5 ${currentWidth} rounded-md`} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={`tr-${rowIndex}`}>
                  {row.map((column, columnIndex) => (
                    <TableCell key={`tc-${rowIndex}-${columnIndex}`}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
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
            <Label htmlFor="rows-per-page-user" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${currentSize}`}
              onValueChange={(val) => {
                handlePageSizeChange(Number(val));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page-user">
                <SelectValue placeholder={`${currentSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => handlePageChange(0)}
              disabled={safePageIndex === 0}
            >
              <span className="sr-only">Go to first page</span>
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => handlePageChange(Math.max(0, safePageIndex - 1))}
              disabled={safePageIndex === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Button>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {safePageIndex + 1} of {pageCount}
            </div>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => handlePageChange(Math.min(pageCount - 1, safePageIndex + 1))}
              disabled={safePageIndex >= pageCount - 1}
            >
              <span className="sr-only">Go to next page</span>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => handlePageChange(pageCount - 1)}
              disabled={safePageIndex >= pageCount - 1}
            >
              <span className="sr-only">Go to last page</span>
              <HugeiconsIcon icon={ArrowRightDoubleIcon} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}