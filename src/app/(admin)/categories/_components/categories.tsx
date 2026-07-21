'use client';

// --- CATATAN IT: Sesuaikan nama file/path import di bawah ini jika Anda sudah membuat filenya ---
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import useDataTable from '@/hooks/use-data-table';
import DialogCreateCategory from './dialog-create-category';
import DialogUpdateCategory from './dialog-update-category';
import DialogDeleteCategory from './dialog-delete-category';
import DataTableCategory from './data-table-category';
import { Category } from '@/types/general';



export default function CategoryManagement() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    // 1. QUERY KEY & QUERY FN
    const { data: categories, isLoading, refetch } = useQuery({
        queryKey: ['categories', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            let query = supabase
                .from('kategori') // Menunjuk ke tabel kategori di Supabase
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false });

            // Fitur Pencarian (Search) Kategori
            if (currentSearch && currentSearch.trim() !== '') {
                query = query.ilike('nama_kategori', `%${currentSearch}%`);
            }

            const from = (currentPage - 1) * currentLimit;
            const to = from + currentLimit - 1;
            query = query.range(from, to);

            const { data, error } = await query;

            if (error) {
                toast.error('Get Category data failed', {
                    description: error.message,
                });
                return null;
            }

            return data as Category[];
        },
        staleTime: 1000 * 60 * 5,
    });

    const [selectedAction, setSelectedAction] = useState<{
        data: Category;
        type: 'update' | 'delete';
    } | null>(null);

    const [openCreate, setOpenCreate] = useState(false);
    const handleChangeAction = useCallback((open: boolean) => {
        if (!open) setSelectedAction(null);
    }, []);

    // 2. MAPPING DATA sebagai Kategori[] untuk DataTableCategory
    const filteredData: Category[] = useMemo(() => {
        return (categories || []).map((category) => ({
            ...category,
        }));
    }, [categories]);

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                        <div>
                            {/* 3. UBAH TEKS UI */}
                            <h1 className="text-2xl font-bold tracking-tight">Manajemen Kategori</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola kategori berita Anda di sini.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search category..."
                                className="max-w-xs"
                                onChange={(e) => handleChangeSearch(e.target.value)}
                            />
                            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                                <DialogTrigger asChild>
                                    <Button className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 hover:cursor-pointer">Buat Kategori Baru</Button>
                                </DialogTrigger>
                                <DialogCreateCategory refetch={refetch} setOpen={setOpenCreate} />
                            </Dialog>
                        </div>
                    </div>

                    <DataTableCategory
                        data={filteredData}
                        isLoading={isLoading}
                        onEdit={(category) =>
                            setSelectedAction({ data: category, type: 'update' })
                        }
                        onDelete={(category) =>
                            setSelectedAction({ data: category, type: 'delete' })
                        }
                    />
                    <DialogUpdateCategory
                        open={selectedAction !== null &&
                            selectedAction.type === 'update'}
                        refetch={refetch}
                        currentData={selectedAction?.data}
                        handleChangeAction={handleChangeAction}
                    />
                    <DialogDeleteCategory
                        open={selectedAction !== null &&
                            selectedAction.type === 'delete'}
                        refetch={refetch}
                        currentData={selectedAction?.data}
                        handleChangeAction={handleChangeAction}
                    />
                </div>
            </div>
        </div>
    );
}