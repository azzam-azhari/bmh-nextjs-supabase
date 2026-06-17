'use client';

import DialogDelete from '@/components/common/dialog-delete';
import { startTransition, useActionState, useEffect } from 'react';
import { deleteCategory } from '../actions';
import { INITIAL_STATE_ACTION } from '@/constants/general-constant';
import { toast } from 'sonner';
import { Category } from '@/types/general';

export default function DialogDeleteCategory({
    open,
    refetch,
    currentData,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Category;
    open: boolean;
    handleChangeAction: (open: boolean) => void;
}) {
    const [deleteState, deleteAction, isPendingDelete] =
        useActionState(deleteCategory, INITIAL_STATE_ACTION);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('id', String(currentData!.id));
        startTransition(() => {
            deleteAction(formData);
        });
    };

    useEffect(() => {
        if (deleteState?.status === 'error') {
            toast.error('Gagal menghapus kategori', {
                description: deleteState.errors?._form?.[0],
            });
        }

        if (deleteState?.status === 'success') {
            toast.success('Kategori berhasil dihapus');
            handleChangeAction?.(false);
            refetch();
        }
    }, [deleteState, handleChangeAction, refetch]);

    return (
        <DialogDelete
            open={open}
            onOpenChange={handleChangeAction}
            isLoading={isPendingDelete}
            onSubmit={onSubmit}
            title="Kategori"
        />
    );
}