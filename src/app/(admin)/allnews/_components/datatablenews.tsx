'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
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
  LeftToRightListBulletIcon,
  ArrowDown01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons"
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useDataTable from '@/hooks/use-data-table';
import { NewsQuickEdit } from './news-quick-edit';

// ✅ Header sesuai kolom tabel News
const HEADERS = ["", "No", "Judul", "Autor", "Kategori", "Tags", "Dibuat Pada", "Status", "Action"];

// ✅ Skeleton width disesuaikan per kolom News
const SKELETON_WIDTHS = ['w-5', 'w-7', 'w-48', 'w-40', 'w-12', 'w-28', 'w-8'];

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
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
  } = useDataTable();

  const queryClient = useQueryClient();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(HEADERS));
  const [categories, setCategories] = useState<string[]>([]);
  const supabase = createClient();

  // State untuk Quick Edit Drawer
  const [quickEditData, setQuickEditData] = useState<News | null>(null);
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('kategori').select('nama_kategori');
      if (data && !error) {
        setCategories(data.map(cat => cat.nama_kategori));
      }
    };
    fetchCategories();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.judul.toLowerCase().includes(currentSearch.toLowerCase());
      const matchCategory = categoryFilter === 'all' || item.kategori?.nama_kategori === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [data, currentSearch, categoryFilter]);

  const totalItems = filteredData.length;
  const pageCount = Math.ceil(totalItems / currentLimit) || 1;
  const safePageIndex = Math.max(0, Math.min(currentPage - 1, pageCount - 1));

  const paginatedData = filteredData.slice(
    safePageIndex * currentLimit,
    (safePageIndex + 1) * currentLimit
  );

  const toggleColumnVisibility = (column: string, isVisible: boolean) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (isVisible) next.add(column);
      else next.delete(column);
      return next;
    });
  };

  // ✅ Format tanggal ke bahasa Indonesia
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
    });

  // ✅ Checkbox: apakah semua baris di halaman ini terpilih?
  const allPageSelected = useMemo(
    () => paginatedData.length > 0 && paginatedData.every((row) => selectedRows.has(row.id)),
    [paginatedData, selectedRows]
  );
  const somePageSelected = useMemo(
    () => paginatedData.some((row) => selectedRows.has(row.id)) && !allPageSelected,
    [paginatedData, selectedRows, allPageSelected]
  );

  const toggleAllPage = useCallback(
    (checked: boolean) => {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        for (const row of paginatedData) {
          if (checked) next.add(row.id);
          else next.delete(row.id);
        }
        return next;
      });
    },
    [paginatedData]
  );

  const toggleRow = useCallback((id: number, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <div className="w-full flex-col justify-start gap-6 px-4 lg:px-6">
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Cari berita..."
            className="w-full pr-8"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleChangeSearch(e.target.value);
            }}
          />
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue('');
                handleChangeSearch('');
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              type="button"
            >
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 w-full md:flex md:w-auto md:items-center md:gap-2">
          <div className="col-span-1">
            <Label htmlFor="category-filter" className="sr-only">
              Filter Category
            </Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger size="sm" className="w-full md:w-36" id="category-filter">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((kategori) => (
                    <SelectItem key={kategori} value={kategori}>
                      {kategori}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full md:w-auto flex justify-center items-center gap-1">
                  <HugeiconsIcon icon={LeftToRightListBulletIcon} strokeWidth={2} data-icon="inline-start" />
                  <span className="truncate">Columns</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {HEADERS.filter(col => col !== "" && col !== "Action" && col !== "No").map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col}
                    className="capitalize"
                    checked={visibleColumns.has(col)}
                    onCheckedChange={(value) => toggleColumnVisibility(col, !!value)}
                  >
                    {col}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="col-span-1">
            <Button variant="outline" size="sm" className="w-full md:w-auto flex justify-center items-center gap-1">
              <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              <span className="hidden sm:inline">Tambah Berita</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              {HEADERS.map((col, i) =>
                !visibleColumns.has(col) ? null : (
                  i === 0 ? (
                    <TableHead key="select-all" className="w-10">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={allPageSelected || (somePageSelected && 'indeterminate')}
                          onCheckedChange={(value) => toggleAllPage(!!value)}
                          aria-label="Select all"
                        />
                      </div>
                    </TableHead>
                  ) : (
                    <TableHead key={col}>{col}</TableHead>
                  )
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: currentLimit }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {HEADERS.map((col, colIndex) => (
                    visibleColumns.has(col) ? (
                      <TableCell key={`skeleton-col-${rowIndex}-${colIndex}`}>
                        <Skeleton className={`h-5 ${SKELETON_WIDTHS[colIndex] ?? 'w-20'} rounded-md`} />
                      </TableCell>
                    ) : null
                  ))}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={row.id} data-state={selectedRows.has(row.id) && "selected"}>
                  {/* Checkbox per baris */}
                  {visibleColumns.has("") && (
                    <TableCell className="w-10">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={(value) => toggleRow(row.id, !!value)}
                          aria-label={`Select row ${row.id}`}
                        />
                      </div>
                    </TableCell>
                  )}

                  {visibleColumns.has("No") && (
                    <TableCell>{safePageIndex * currentLimit + rowIndex + 1}</TableCell>
                  )}

                  {/* Kolom Judul - DIBATASI, RESPONSIF */}
                  {visibleColumns.has("Judul") && (
                    <TableCell className="max-w-[333px] sm:max-w-[200px] md:max-w-[250px]" title={row.judul}>
                      <span 
                        className="line-clamp-2 cursor-pointer hover:underline text-primary transition-all" 
                        onClick={() => {
                          setQuickEditData(row);
                          setIsQuickEditOpen(true);
                        }}
                      >
                        {row.judul}
                      </span>
                    </TableCell>
                  )}

                  {visibleColumns.has("Autor") && (
                    <TableCell
                      className="max-w-[150px] text-muted-foreground"
                      title={row.penulis_nama || undefined}
                    >
                      <span className="line-clamp-1">{row.penulis_nama || '-'}</span>
                    </TableCell>
                  )}

                  {/* Kategori - Badge */}
                  {visibleColumns.has("Kategori") && (
                    <TableCell className="max-w-[100px]" title={row.kategori?.nama_kategori || undefined}>
                      {row.kategori?.nama_kategori ? (
                        <Badge variant="secondary" className="px-2 font-normal">
                          {row.kategori.nama_kategori}
                        </Badge>
                      ) : '-'}
                    </TableCell>
                  )}

                  {/* Tags - Badge outline, 1 baris */}
                  {visibleColumns.has("Tags") && (
                    <TableCell className="max-w-[100px] sm:max-w-[150px]" title={row.tags?.join(', ') || undefined}>
                      {row.tags && row.tags.length > 0 ? (
                        <div className="flex flex-nowrap gap-1 overflow-hidden">
                          {row.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="shrink-0 px-1.5 text-xs text-muted-foreground font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : '-'}
                    </TableCell>
                  )}

                  {/* Tanggal - teks pudar */}
                  {visibleColumns.has("Dibuat Pada") && (
                    <TableCell className="text-muted-foreground text-sm tabular-nums">
                      {formatDate(row.created_at)}
                    </TableCell>
                  )}

                  {visibleColumns.has("Status") && (
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                  )}

                  {visibleColumns.has("Action") && (
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
                  )}
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
      <div className="flex items-center justify-between pt-4">
        {/* Indikator row terpilih */}
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {selectedRows.size} of {data.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page-category" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${currentLimit}`}
              onValueChange={(val) => { handleChangeLimit(Number(val)); }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page-category">
                <SelectValue placeholder={`${currentLimit}`} />
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
              onClick={() => handleChangePage(1)} disabled={safePageIndex === 0}>
              <span className="sr-only">Go to first page</span>
              <HugeiconsIcon icon={ArrowLeftDoubleIcon} strokeWidth={2} />
            </Button>
            <Button variant="outline" className="size-8" size="icon"
              onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
              disabled={safePageIndex === 0}>
              <span className="sr-only">Go to previous page</span>
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Button>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {safePageIndex + 1} of {pageCount}
            </div>
            <Button variant="outline" className="size-8" size="icon"
              onClick={() => handleChangePage(Math.min(pageCount, currentPage + 1))}
              disabled={safePageIndex >= pageCount - 1}>
              <span className="sr-only">Go to next page</span>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
            <Button variant="outline" className="hidden size-8 lg:flex" size="icon"
              onClick={() => handleChangePage(pageCount)}
              disabled={safePageIndex >= pageCount - 1}>
              <span className="sr-only">Go to last page</span>
              <HugeiconsIcon icon={ArrowRightDoubleIcon} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer Quick Edit */}
      <NewsQuickEdit 
        news={quickEditData} 
        open={isQuickEditOpen} 
        onOpenChange={setIsQuickEditOpen} 
        onSaved={() => {
          queryClient.invalidateQueries({ queryKey: ['news'] });
        }}
      />
    </div>
  );
}