import {
    INITIAL_CREATE_USER_FORM,
    INITIAL_STATE_CREATE_USER,
    INITIAL_STATE_UPDATE_USER,
} from '@/constants/auth-constant';
import {
    CreateUserForm,
    createUserSchema,
    UpdateUserForm,
    updateUserSchema,
} from '@/validations/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUser, updateUser } from '../actions';
import { toast } from 'sonner';
import { Preview } from '@/types/general';
import FormUser from './form-user';
import { Profile } from '@/types/auth';
import { Dialog } from '@radix-ui/react-dialog';
import { useAuthStore } from "@/stores/auth-store";

export default function DialogUpdateUser({
    refetch,
    currentData,
    open,
    handleChangeAction,
}: {
    refetch: () => void;
    currentData?: Profile;
    open?: boolean;
    handleChangeAction?: (open: boolean) => void;
}) {
    const form = useForm<UpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
    });

    const [updateUserState, updateUserAction, isPendingUpdateUser] =
        useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

    const [preview, setPreview] = useState<Preview | undefined>(undefined);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        if (preview?.file) {
            Object.entries(data).forEach(([key, value]) => {
                // Penegasan preview.file as File dan value ?? ''
                formData.append(key, key === 'avatar_url' ? (preview.file as File) : (value ?? ''));
            });
            formData.append('old_avatar_url', currentData?.avatar_url ?? '');
        } else {
            Object.entries(data).forEach(([key, value]) => {
                // Tambahkan fallback string kosong
                formData.append(key, key === 'avatar_url' ? (currentData?.avatar_url ?? '') : (value ?? ''));
            });
        }
        formData.append('id', currentData?.id ?? '');

        startTransition(() => {
            updateUserAction(formData);
        });
    });

    useEffect(() => {
        if (updateUserState?.status === 'error') {
            toast.error('Update User Failed', {
                description: updateUserState.errors?._form?.[0],
            });
        }

        if (updateUserState?.status === 'success') {
            toast.success('Update User Success');
            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateUserState]);

    useEffect(() => {
        if (currentData) {
            form.setValue('name', currentData.name as string);
            form.setValue('role', currentData.role as string);
            form.setValue('avatar_url', currentData.avatar_url as string);
            setPreview({
                file: undefined,
                displayUrl: currentData.avatar_url as string,
            });
        }
    }, [currentData]);
    // 2. Ambil data profil user yang sedang login
    const userLogin = useAuthStore((state) => state.profile);

    useEffect(() => {
        if (updateUserState?.status === 'error') {
            toast.error('Update User Failed', {
                description: updateUserState.errors?._form?.[0],
            });
        }

        if (updateUserState?.status === 'success') {
            toast.success('Update User Success');

            // PERBAIKAN: Jika ID user yang diedit sama dengan ID user yang sedang login, update Zustand store langsung
            if (userLogin && userLogin.id === currentData?.id) {
                useAuthStore.setState({
                    profile: {
                        ...userLogin,
                        name: form.getValues('name'),
                        role: form.getValues('role'),
                        avatar_url: preview?.displayUrl ?? userLogin.avatar_url,
                    }
                });
            }

            form.reset();
            handleChangeAction?.(false);
            refetch();
        }
    }, [updateUserState]);

    return (
        <Dialog open={open} onOpenChange={handleChangeAction}>
            <FormUser
                form={form}
                onSubmit={onSubmit}
                isLoading={isPendingUpdateUser}
                type="Update"
                preview={preview}
                setPreview={setPreview}
            />
        </Dialog>
    );
}
