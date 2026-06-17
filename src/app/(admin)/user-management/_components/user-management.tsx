'use client';

import DropdownAction from '@/components/common/dropdown-action';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { HEADER_TABLE_USER } from '@/constants/user-constant';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit01Icon, Delete02Icon } from "@hugeicons/core-free-icons";

import useDataTable from '@/hooks/use-data-table';
import DialogCreateUser from './dialog-create-user';
import DialogUpdateUser from './dialog-update-user';
import DialogDeleteUser from './dialog-delete-user';
import DataTableUser from './data-table-user';
import { Profile } from '@/types/auth';

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

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            let query = supabase
                .from('profiles')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false });

            if (currentSearch && currentSearch.trim() !== '') {
                query = query.ilike('name', `%${currentSearch}%`);
            }

            const from = (currentPage - 1) * currentLimit;
            const to = from + currentLimit - 1;
            query = query.range(from, to);

            const { data, error } = await query;

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

    const [selectedAction, setSelectedAction] = useState<{
        data: Profile;
        type: 'update' | 'delete';
    } | null>(null);

    const [openCreate, setOpenCreate] = useState(false);
    const handleChangeAction = (open: boolean) => {
        if (!open) setSelectedAction(null);
    };

    const filteredData = useMemo(() => {
        return (users || []).map((user, index) => {
            const displayIndex = (currentPage - 1) * currentLimit + index + 1;

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
                                    <HugeiconsIcon icon={PencilEdit01Icon} size={16}  />
                                    Edit
                                </span>
                            ),
                            action: () => {
                                setSelectedAction({
                                    data: user,
                                    type: 'update',
                                })
                            },
                        },
                        {
                            label: (
                                <span className="flex items-center gap-2">
                                    <HugeiconsIcon icon={Delete02Icon} className="text-red-400" size={16}  />
                                    Delete
                                </span>
                            ),
                            variant: 'destructive',
                            action: () => {
                                setSelectedAction({
                                    data: user,
                                    type: 'delete',
                                })
                            },
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Manajemen User</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola user dan role pada website.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Cari berdasarkan nama"
                                className="max-w-xs"
                                onChange={(e) => handleChangeSearch(e.target.value)}
                            />
                            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                                <DialogTrigger asChild>
                                    <Button className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 hover:cursor-pointer">Tambah User</Button>
                                </DialogTrigger>
                                <DialogCreateUser refetch={refetch} setOpen={setOpenCreate} />
                            </Dialog>
                        </div>
                    </div>

                    <DataTableUser
                        header={HEADER_TABLE_USER}
                        data={filteredData}
                        isLoading={isLoading}
                    />
                    <DialogUpdateUser
                        open={selectedAction !== null && selectedAction.type === 'update'}
                        refetch={refetch}
                        currentData={selectedAction?.data}
                        handleChangeAction={handleChangeAction}
                    />
                    <DialogDeleteUser
                        open={selectedAction !== null && selectedAction.type === 'delete'}
                        refetch={refetch}
                        currentData={selectedAction?.data}
                        handleChangeAction={handleChangeAction}
                    />
                </div>
            </div>
        </div>
    );
}