import { type Row } from '@tanstack/react-table'
import { Trash2 , Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDishes } from '@/features/dishes/components/dishes-provider.tsx'
import type { Dishe } from '@/types/global'

type DataTableRowActionsProps<TData extends Dishe> = {
    row: Row<TData>
}

export function DataTableRowActions<TData extends Dishe>({row,}: DataTableRowActionsProps<TData>) {

    const dishe: Dishe  = row.original;

    const { setOpen, setCurrentItem } = useDishes()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
                >
                    <Ellipsis className='h-4 w-4' />
                    <span className='sr-only'>Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentItem(dishe)
                        setOpen('update')
                    }}
                >
                    Modifier
                </DropdownMenuItem>
                <DropdownMenuItem disabled>Make a copy</DropdownMenuItem>
                <DropdownMenuItem disabled>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setCurrentItem(dishe)
                        setOpen('delete')
                    }}
                >
                    Supprimer
                    <DropdownMenuShortcut>
                        <Trash2 size={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}