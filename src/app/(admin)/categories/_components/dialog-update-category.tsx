'use client';

import {
    INITIAL_STATE_UPDATE_CATEGORY,
} from '@/constants/category-constant';
import {
    UpdateCategoryForm,
    updateCategorySchema,
} from '@/validations/category-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateCategory } from '../actions';
import { toast } from 'sonner';
import FormCategory from './form-category';
import { Dialog } from '@/components/ui/dialog';
import { Category } from '@/types/general';

export default function DialogUpdateCategory({
    refetch,
    currentData,
    open,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Category;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
}) {
    const form = useForm<UpdateCategoryForm>({
        resolver: zodResolver(updateCategorySchema),
    });

    const [updateState, updateAction, isPendingUpdate] =
        useActionState(updateCategory, INITIAL_STATE_UPDATE_CATEGORY);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        formData.append('id', String(currentData?.id ?? ''));

        startTransition(() => {
            updateAction(formData);
        });
    });

    useEffect(() => {
        if (updateState?.status === 'error') {
            toast.error('Gagal mengubah kategori', {
                description: updateState.errors?._form?.[0],
            });
        }

        if (updateState?.status === 'success') {
            toast.success('Kategori berhasil diubah');
            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateState, form, handleChangeAction, refetch]);

    useEffect(() => {
        if (currentData) {
            form.setValue('nama_kategori', currentData.nama_kategori);
            form.setValue('slug', currentData.slug);
        }
    }, [currentData, form]);

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormCategory
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdate}
                type="Edit"
            />
        </Dialog>
    );
}
