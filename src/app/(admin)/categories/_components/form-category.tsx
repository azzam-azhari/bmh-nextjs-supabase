import FormInput from '@/components/common/form-input';
import { Button } from '@/components/ui/button';
import {
    DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { CreateCategoryForm, UpdateCategoryForm } from '@/validations/category-validation';
import { UseFormReturn } from 'react-hook-form';

export default function FormCategory({
    form,
    onSubmit,
    isLoading,
    type,
}: {
    form: UseFormReturn<CreateCategoryForm> | UseFormReturn<UpdateCategoryForm>;
    onSubmit: () => void;
    isLoading: boolean;
    type: 'Create' | 'Edit';
}) {
    // Auto-generate slug dari nama_kategori
    const handleNamaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const slug = e.target.value
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        form.setValue('slug' as never, slug as never);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{type} Kategori</DialogTitle>
                <DialogDescription>
                    Isi data kategori berita dengan benar.
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <FormInput
                        form={form as UseFormReturn<CreateCategoryForm>}
                        name="nama_kategori"
                        label="Nama Kategori"
                        placeholder="Contoh: Teknologi"
                    />
                    <FormInput
                        form={form as UseFormReturn<CreateCategoryForm>}
                        name="slug"
                        label="Slug"
                        placeholder="contoh: teknologi"
                    />
                    <FormInput
                        form={form as UseFormReturn<CreateCategoryForm>}
                        name="jumlah"
                        label="Jumlah (opsional)"
                        type="number"
                        placeholder="0"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Menyimpan...' : `${type} Kategori`}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}