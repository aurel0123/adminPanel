'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDishes } from './dishes-provider'
import { deleteDishe } from '@/api/dishe.api'

type TaskMultiDeleteDialogProps<TData> = {
    open: boolean
    onOpenChange: (open: boolean) => void
    table: Table<TData>
}

const CONFIRM_WORD = 'SUPPRIMER'

export function DishesMultiDeleteDialog<TData>({open, onOpenChange, table,}: TaskMultiDeleteDialogProps<TData>) {
    const [value, setValue] = useState('')
    const {refreshDishes} = useDishes()
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const handleDelete  = async () => {
        if (value.trim() !== CONFIRM_WORD) {
            toast.error(`Veuillez taper  "${CONFIRM_WORD}" pour confirmer.`)
            return
        }

        onOpenChange(false)
        try {
            toast.promise(
                Promise.all(
                    selectedRows.map((row) => deleteDishe(row.original.idDish))
                ),
                {
                    loading: 'Suppression en cours...',
                    success: async () => {
                        table.resetRowSelection()
                        await refreshDishes()
                        return `Suppression de ${selectedRows.length} ${selectedRows.length > 1 ? 'plats' : 'plat'} réussie.`
                    },
                    error: 'Erreur lors de la suppression.',
                }
            )

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={handleDelete}
            disabled={value.trim() !== CONFIRM_WORD}
            title={
                <span className='text-destructive'>
          <AlertTriangle
              className='stroke-destructive me-1 inline-block'
              size={18}
          />{' '}
                    Supprimer {selectedRows.length}{' '}
                    {selectedRows.length > 1 ? 'plats' : 'plat'} ?
        </span>
            }
            desc={
                <div className='space-y-4'>
                    <p className='mb-2'>
                        Êtes-vous sûr de vouloir supprimer les plats sélectionnées ?<br />
                        Cette action est irréversible.
                    </p>

                    <Label className='my-4 flex flex-col items-start gap-1.5'>
                        <span className=''>Confirmer en tapant "{CONFIRM_WORD}":</span>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={`Tapez "${CONFIRM_WORD}" pour confirmer.`}
                        />
                    </Label>

                    <Alert variant='destructive'>
                        <AlertTitle>Avertissement!</AlertTitle>
                        <AlertDescription>
                            Soyez prudent, cette opération ne peut pas être annulée.
                        </AlertDescription>
                    </Alert>
                </div>
            }
            confirmText='Delete'
            destructive
        />
    )
}