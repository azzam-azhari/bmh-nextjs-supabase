'use client';

import DropdownAction from '@/components/common/dropdown-action';
import DataTableUser from './data-table-user';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { HEADER_TABLE_USER } from '@/constants/user-constant';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash2Icon } from 'lucide-react';
import useDataTable from '@/hooks/use-data-table';
import DialogCreateUser from './dialog-create-user';

export default function UserManagement() {
    const supabase = createClient();
    const {
        currentPage,
        currentLimit,
        currentSearch,
        handleChangePage,
        handleChangeLimit,
        handleChangeSearch,
    } = useDataTable();

    const { data: users, isLoading, refetch } = useQuery({ // PERBAIKAN: isLoadi ng -> isLoading
        queryKey: ['users', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            // 1. Query dasar
            let query = supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false });

            // 2. Hanya jalankan pencarian jika ada input (menghemat resource)
            if (currentSearch && currentSearch.trim() !== '') { // PERBAIKAN: & & -> &&
                query = query.ilike('name', `%${currentSearch}%`);
            }

            // 3. TERAPKAN PAGINATION di sisi database (Kunci agar loading cepat!)
            const from = (currentPage - 1) * currentLimit;
            const to = from + currentLimit - 1;
            query = query.range(from, to);

            const { data, error } = await query; // PERBAIKAN: awa it -> await

            if (error) {
                toast.error('Get User data failed', {
                    description: error.message,
                });
                return null;
            }

            return data;
        },
        staleTime: 1000 * 60 * 5,
    });

    const filteredData = useMemo(() => {
        return (users || []).map((user, index) => {
            const displayIndex = (currentPage - 1) * currentLimit + index + 1; // PERBAIKAN: di splayIndex -> displayIndex

            return [
                displayIndex,
                user.id,
                user.name,
                user.role,
                <DropdownAction
                    key={user.id}
                    menu={[
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Pencil size={16} />
                                    Edit
                                </span>
                            ),
                            action: () => { },
                        },
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <Trash2Icon className="text-red-400" size={16} />
                                    Delete
                                </span>
                            ),
                            variant: 'destructive',
                            action: () => { },
                        },
                    ]}
                />
            ];
        });
    }, [users, currentPage, currentLimit]);

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                    {/* HEADER STANDAR */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your website users and their roles.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search by name"
                                className="max-w-xs"
                                onChange={(e) => handleChangeSearch(e.target.value)}
                            />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Create</Button>
                                </DialogTrigger>
                                <DialogCreateUser refetch={refetch} />
                            </Dialog>
                        </div>
                    </div>
                    {/* END HEADER STANDAR */}

                    <DataTableUser
                        header={HEADER_TABLE_USER}
                        data={filteredData}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}