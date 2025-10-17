import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { type Categorie } from '../data/schema';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { DataTableRowActions } from '@/features/categories/components/data-table-row-actions.tsx';
import { Icon } from '@/components/icon'; // 🔁 Exemple d'icône — à adapter si tu as une autre lib ou un autre composant

export const CategoriesColumns: ColumnDef<Categorie>[] = [
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

    // ✅ ID catégorie
    {
        accessorKey: 'idCategory',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID Catégorie' />
        ),
        cell: ({ row }) => (
            <div className='truncate w-[120px] text-muted-foreground'>
                {row.getValue('idCategory')}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // ✅ Nom + icône
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Nom de la catégorie' />
        ),
        cell: ({ row }) => {
            const name = row.getValue('name') as string;
            const icon:string | undefined = row.original.icon;

            return (
                <div className='flex items-center space-x-2 font-medium'>
                    {/* 🔁 Adaptation selon ta lib d'icônes */}
                    <Icon name={icon} className="text-primary" />
                    <span>{name}</span>
                </div>
            );
        },
    },

    // ✅ Description
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

    // ✅ Actions (éditer, supprimer...)
    {
        id: 'actions',
        enableHiding: false ,
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
