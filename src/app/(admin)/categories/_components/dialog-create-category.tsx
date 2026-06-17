'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
    INITIAL_CREATE_CATEGORY_FORM,
    INITIAL_STATE_CREATE_CATEGORY,
} from '@/constants/category-constant';
import {
    CreateCategoryForm,
    createCategorySchema,
} from '@/validations/category-validation';
import { createCategory } from '../actions';
import FormCategory from './form-category';

export default function DialogCreateCategory({
    refetch,
    setOpen,
}: {
    refetch: () => void;
    setOpen: (open: boolean) => void;
}) {
    const form = useForm<CreateCategoryForm>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: INITIAL_CREATE_CATEGORY_FORM,
    });

    const [state, action, isPending] = useActionState(
        createCategory,
        INITIAL_STATE_CREATE_CATEGORY
    );

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        startTransition(() => action(formData));
    });

    useEffect(() => {
        if (state?.status === 'error') {
            toast.error('Gagal membuat kategori', {
                description: state.errors?._form?.[0],
            });
        }
        if (state?.status === 'success') {
            toast.success('Kategori berhasil dibuat');
            form.reset();
            setOpen(false);
            refetch();
        }
    }, [state, form, setOpen, refetch]);

    return (
        <FormCategory
            form={form}
            onSubmit={onSubmit}
            isLoading={isPending}
            type="Create"
        />
    );
}