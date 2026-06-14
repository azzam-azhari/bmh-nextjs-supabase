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

    const userLogin = useAuthStore((state) => state.profile);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('role', data.role);
        if (data.avatar_url) {
            formData.append('avatar_url', data.avatar_url);
        }
        if (currentData?.avatar_url) {
            formData.append('old_avatar_url', currentData.avatar_url as string);
        }
        formData.append('id', currentData?.id ?? '');

        // OPTIMISTIC UPDATE: Tampilan NavUser langsung berubah instan saat tombol diklik
        if (userLogin && userLogin.id === currentData?.id) {
            useAuthStore.setState({
                profile: {
                    ...userLogin,
                    name: data.name,
                    role: data.role,
                    avatar_url: preview?.displayUrl ?? userLogin.avatar_url,
                }
            });
        }

        startTransition(() => {
            updateUserAction(formData);
        });
    });

    useEffect(() => {
        if (updateUserState?.status === 'error') {
            toast.error('Update User Failed', {
                description: updateUserState.errors?._form?.[0] || 'Terjadi kesalahan pada server.',
            });
            // Revert optimistic update if needed or just refetch
            refetch();
        }

        if (updateUserState?.status === 'success') {
            toast.success('Update User Success');
            
            if (userLogin && userLogin.id === currentData?.id) {
                // Ensure store has the latest confirmed data just in case
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
