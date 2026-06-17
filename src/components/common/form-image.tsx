import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { HugeiconsIcon } from "@hugeicons/react";
import { Image01Icon } from "@hugeicons/core-free-icons";

import { getImageData } from '@/lib/utils';
import { Preview } from '@/types/general';

export default function FormImage<T extends FieldValues>({
    form,
    name,
    label,
    preview,
    setPreview,
}: {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    preview?: Preview;
    setPreview?: (preview: Preview) => void;
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-9 w-9 rounded-lg">
                                <AvatarImage
                                    src={preview?.displayUrl}
                                    alt="preview"
                                    className="object-cover"
                                />
                                <AvatarFallback className="rounded-lg">
                                    <HugeiconsIcon icon={Image01Icon} className="w-4 h-4"  />
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                type="file"
                                name={rest.name}
                                ref={rest.ref}
                                onBlur={rest.onBlur}
                                disabled={rest.disabled}
                                onChange={async (event) => {
                                    onChange(event);
                                    const { file, displayUrl } = getImageData(event);
                                    if (file) {
                                        setPreview?.({
                                            file,
                                            displayUrl,
                                        });
                                    }
                                }}
                            />
                        </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
    );
}
