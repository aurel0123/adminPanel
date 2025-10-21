import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, Download } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table/bulk-actions.tsx'
import { DishesMultiDeleteDialog } from './dishes-multi-delete-dialog.tsx'
import type { Dishe } from '@/types/global.js'

type DataTableBulkActionsProps<TData> = {
    table: Table<TData>
}

export function DataTableBulkActions<TData>({
                                                table,
                                            }: DataTableBulkActionsProps<TData>) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const selectedRows = table.getFilteredSelectedRowModel().rows



    const handleBulkExport = () => {
        const selectedCategorie = selectedRows.map((row) => row.original as Dishe)
        toast.promise(sleep(2000), {
            loading: 'Exporting tasks...',
            success: () => {
                table.resetRowSelection()
                return `Exported ${selectedCategorie.length} task${selectedCategorie.length > 1 ? 's' : ''} to CSV.`
            },
            error: 'Error',
        })
        table.resetRowSelection()
    }

    return (
        <>
            <BulkActionsToolbar table={table} entityName='Categories'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleBulkExport()}
                            className='size-8'
                            aria-label='Export tasks'
                            title='Export tasks'
                        >
                            <Download />
                            <span className='sr-only'>Export tasks</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Export tasks</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant='destructive'
                            size='icon'
                            onClick={() => setShowDeleteConfirm(true)}
                            className='size-8'
                            aria-label='Delete selected tasks'
                            title='Delete selected tasks'
                        >
                            <Trash2 />
                            <span className='sr-only'>Delete selected tasks</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete selected tasks</p>
                    </TooltipContent>
                </Tooltip>
            </BulkActionsToolbar>
            <DishesMultiDeleteDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                table={table}
            />
        </>
    )
}