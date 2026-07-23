'use client';

import FormInput from '@/components/common/form-input';
import FormSelect from '@/app/(admin)/user-management/_components/form-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Preview } from '@/types/general';
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, Loading01Icon } from "@hugeicons/core-free-icons";

import { FormEvent } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export default function FormBerita<T extends FieldValues>({
    form,
    onSubmit,
    isLoading,
    type,
    preview,
    setPreview,
    categories,
    isMobile,
    penulisNama,
}: {
    form: UseFormReturn<T>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    type: 'Create' | 'Update';
    preview?: Preview;
    setPreview?: (preview: Preview) => void;
    categories: { value: string; label: string }[];
    isMobile?: boolean;
    penulisNama?: string | null;
}) {
    const statusOptions = [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' },
    ];

    return (
        <DrawerContent className={isMobile ? "max-h-[85vh] outline-none" : "h-screen w-full sm:max-w-md outline-none"}>
            <Form {...form}>
                <DrawerHeader>
                    <DrawerTitle>{type} Berita</DrawerTitle>
                    <DrawerDescription>
                        {type === 'Create'
                            ? 'Buat berita baru'
                            : 'Edit informasi dasar berita dengan cepat.'}
                    </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={onSubmit} className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 flex flex-col h-full justify-between">
                    <div className="space-y-4">
                        {/* 1. Tampilkan Gambar Landscape di Paling Atas */}
                        <FormField
                            control={form.control}
                            name={'gambar_url' as Path<T>}
                            render={({ field: { onChange, ...rest } }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            {/* Landscape Image Viewer */}
                                            <div className="w-full aspect-video relative rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                                                {preview?.displayUrl ? (
                                                    <img
                                                        src={preview.displayUrl}
                                                        alt="Cover Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                            const parent = (e.target as HTMLImageElement).parentElement;
                                                            if (parent) {
                                                                const fallback = parent.querySelector('.fallback-svg');
                                                                if (fallback) fallback.classList.remove('hidden');
                                                            }
                                                        }}
                                                    />
                                                ) : null}
                                                <div className={`fallback-svg flex flex-col items-center justify-center text-muted-foreground ${preview?.displayUrl ? 'hidden' : ''}`}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-10 mb-1"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 1.75 0Z" />
                                                    </svg>
                                                    <span className="text-xs">Tidak ada gambar</span>
                                                </div>
                                            </div>

                                            {/* Button Upload di Bawah Image Viewer */}
                                            <div className="flex justify-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="berita-image-upload"
                                                    name={rest.name}
                                                    ref={rest.ref}
                                                    onBlur={rest.onBlur}
                                                    disabled={rest.disabled}
                                                    onChange={async (event) => {
                                                        const file = event.target.files?.[0];
                                                        if (file) {
                                                            onChange(file);
                                                            const displayUrl = URL.createObjectURL(file);
                                                            setPreview?.({ file, displayUrl });
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={() => document.getElementById('berita-image-upload')?.click()}
                                                >
                                                    Ganti Gambar
                                                </Button>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* 2. Form Judul di Bawah Gambar */}
                        <FormInput
                            form={form}
                            name={'judul' as Path<T>}
                            label="Judul"
                            placeholder="Judul berita..."
                        />

                        {/* 3. Penulis Nama di Bawah Judul (Tidak Bisa Di-edit) */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Penulis (Author)
                            </label>
                            <Input
                                value={penulisNama || '-'}
                                readOnly
                                disabled
                                className="bg-muted text-muted-foreground shadow-inner cursor-not-allowed w-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormSelect
                                form={form}
                                name={'kategori_id' as Path<T>}
                                label="Kategori"
                                selectItem={categories}
                            />

                            <FormSelect
                                form={form}
                                name={'status' as Path<T>}
                                label="Status"
                                selectItem={statusOptions}
                            />
                        </div>

                        <FormInput
                            form={form}
                            name={'tags' as Path<T>}
                            label="Tags"
                            placeholder="Contoh: inovasi, pendidikan, terbaru"
                        />

                        <FormField
                            control={form.control}
                            name={'created_at' as Path<T>}
                            render={({ field }) => {
                                const dateVal = field.value ? new Date(field.value) : new Date();
                                const isValidDate = !isNaN(dateVal.getTime());
                                const displayDate = isValidDate ? dateVal : new Date();

                                const formattedDisplay = displayDate.toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });

                                return (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Tanggal</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="w-full justify-between font-normal text-left h-10 px-3 border-input bg-background hover:bg-accent/50 cursor-pointer"
                                                    >
                                                        <span className="text-sm font-medium text-foreground">
                                                            {formattedDisplay}
                                                        </span>
                                                        <HugeiconsIcon icon={Calendar01Icon} className="size-4 text-muted-foreground" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" side="top" align="start">
                                                <Calendar
                                                    selected={displayDate}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            const year = date.getFullYear();
                                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                                            const day = String(date.getDate()).padStart(2, '0');
                                                            field.onChange(`${year}-${month}-${day}`);
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>

                    <DrawerFooter className="px-0 pt-4 mt-auto">
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin mr-2" />
                            ) : null}
                            {type === 'Update' ? 'Simpan Perubahan' : 'Tambah Berita'}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full" disabled={isLoading}>
                                Batal
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </Form>
        </DrawerContent>
    );
}
