import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Dishe } from '@/types/global';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { DataTableRowActions } from '@/features/dishes/components/data-table-row-actions.tsx';
import { Image } from '@imagekit/react';
import { config } from '@/lib/config';

export const DishColumns : ColumnDef<Dishe>[]  = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'nameDish',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Nom du plats' />
        ),
        cell: ({ row }) => {
            const imageDish : string | undefined = row.original.imageDish;

            return (
                 <div className='flex items-center space-x-2 font-medium'>
                    <Image
                        urlEndpoint={config.env.urlEndpointImageKit}
                        src={imageDish || ''}
                        alt="image du plat"
                        className="object-cover w-16 h-16 rounded-md"
                    />
                    <span>{row.getValue('nameDish')}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'category_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Categories' />
        ),
        cell: ({ row }) => (
            <div className='truncate w-[120px] text-sm'>
                {row.getValue('category_name')}
            </div>
        )
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        cell: ({ row }) => (
            <div className='max-w-xs truncate text-sm'>
                {row.getValue('description')}
            </div>
        ),
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Prix du plat' />
        ),
        cell: ({ row }) => (
            <div className='text-sm flex items-center'>
                {row.getValue('price')} CFA
            </div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false ,
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]