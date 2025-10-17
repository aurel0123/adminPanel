import { ConfirmDialog } from '@/components/confirm-dialog'
import { CategoriesMutateDrawer } from './categories-mutate-drawer.tsx'
import { useCategories } from './categorie-provider.tsx'
import {deleteCategorie} from "@/api/categories.api.ts";

export function CategoriesDialogs() {
    const { open, setOpen, currentRow, setCurrentRow, refreshCategories } = useCategories()

    const handleDelete = async () => {
        await deleteCategorie(currentRow?.idCategory)
        refreshCategories()
        setOpen(null)
        setTimeout(() => {
            setCurrentRow(null)
        }, 500)
    }
    return (
        <>
            <CategoriesMutateDrawer
                key='categorie-create'
                open={open === 'create'}
                onOpenChange={() => setOpen('create')}
            />

            {
                currentRow && (
                    <>
                        <CategoriesMutateDrawer
                            key={`categorie-update-${currentRow.idCategory}`}
                            open={open==="update"}
                            onOpenChange={() => {
                                setOpen('update')
                                setTimeout(() => {
                                    setCurrentRow(null)
                                }, 500)
                            }}
                            currentRow = {currentRow}
                        />

                        <ConfirmDialog
                            key='categorie-delete'
                            destructive
                            open={open === 'delete'}
                            onOpenChange={() => {
                                setOpen('delete')
                                setTimeout(() => {
                                    setCurrentRow(null)
                                }, 500)
                            }}
                            handleConfirm={handleDelete}
                            className='max-w-md'
                            title={`Delete this Category: ${currentRow.name} ?`}
                            desc={
                                <>
                                    You are about to delete a task with the ID{' '}
                                    <strong>{currentRow.idCategory}</strong>. <br />
                                    This action cannot be undone.
                                </>
                            }
                            confirmText='Delete'
                        />
                    </>
                )
            }
        </>
    )
}