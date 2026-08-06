import { Dialog } from '@radix-ui/react-dialog';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading01Icon } from "@hugeicons/core-free-icons";


export default function DialogDelete({
    open,
    onOpenChange,
    onSubmit,
    title,
    isLoading,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: () => void;
    title: string;
    isLoading: boolean;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form className="grid gap-6">
                    <DialogHeader>
                        <DialogTitle>Delete {title}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this{' '}
                            <span className="lowercase">{title}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" formAction={onSubmit} className="cursor-pointer">
                            {isLoading ? <HugeiconsIcon icon={Loading01Icon} className="animate-spin" /> : 'Delete'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}