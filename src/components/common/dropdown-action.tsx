import { ReactNode } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";


export default function DropdownAction({
    menu,
}: {
    menu: {
        label?: string | ReactNode;
        variant?: 'destructive' | 'default';
        action?: () => void;
        type?: 'item' | 'link' | 'separator';
    }[];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-muted-foreground size-8 cursor-pointer"
                    size="icon"
                >
                    <HugeiconsIcon icon={MoreVerticalIcon} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {menu.map((item, index) => {
                    if (item.type === 'separator') {
                        return <DropdownMenuSeparator key={`dropdown-action-${index}`} />;
                    }
                    return (
                        <DropdownMenuItem
                            key={`dropdown-action-${index}`}
                            variant={item.variant || 'default'}
                            asChild={item.type === 'link'}
                            onClick={item.action}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}