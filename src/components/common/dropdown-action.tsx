import { ReactNode } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";


export default function DropdownAction({
    menu,
}: {
    menu: {
        label: string | ReactNode;
        variant?: 'destructive' | 'default';
        action?: () => void;
        type?: 'item' | 'link';
    }[];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-muted-foreground size-8"
                    size="icon"
                >
                    <HugeiconsIcon icon={MoreVerticalIcon}  />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {menu.map((item, index) => (
                    <DropdownMenuItem
                        key={`dropdown-action-${index}`}
                        variant={item.variant || 'default'}
                        asChild={item.type === 'link'}
                        onClick={item.action}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}