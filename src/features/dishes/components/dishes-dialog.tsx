import {useDishes} from "@/features/dishes/components/dishes-provider.tsx";
import {DishesMutateDrawer} from "@/features/dishes/components/dishes-mutate-drawer.tsx";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteDishe } from "@/api/dishe.api";
import { toast } from "sonner";

export const DishesDialog = () => {
    const {open , setOpen ,currentItem , setCurrentItem , refreshDishes} = useDishes()

    const handleDelete = async () => {
        if(!currentItem) return;
        if(currentItem.idDish) {
            const response = await deleteDishe(currentItem?.idDish)
            if(response?.success){
                toast.success(response.message)
                refreshDishes()
            }else {
                toast.error(response?.message || "Une erreur est survenue")
            }
        }
        
        setOpen(null)
        setTimeout(() => {
            setCurrentItem(null)
        }, 500)
    }
    return (
        <>
            <DishesMutateDrawer
                key={"dishes-create"}
                open={open === 'create'}
                onOpenChange={()=>setOpen('create')}
            />

            {
                currentItem && (
                    <div>
                        <DishesMutateDrawer
                            key={`dishes-update-${currentItem.idDish}`}
                            open={open==="update"}
                            onOpenChange={() => {
                                setOpen('update')
                                setTimeout(() => {
                                    setCurrentItem(null)
                                }, 500)
                            }}
                            currentItem = {currentItem}
                        />

                        <ConfirmDialog
                            key='dishes-delete'
                            destructive
                            open={open === 'delete'}
                            onOpenChange={() => {
                                setOpen('delete')
                                setTimeout(() => {
                                    setCurrentItem(null)
                                }, 500)
                            }}
                            handleConfirm={handleDelete}
                            className='max-w-md'
                            title={`Supprimer le : ${currentItem.nameDish} ?`}
                            desc={
                                <>
                                    Vous êtes sur le point de supprimer le plat {' '}
                                    <strong>{currentItem.nameDish}</strong>. <br />
                                    Cette action ne peut être annulée.
                                </>
                            }
                            confirmText='Delete'
                        />
                    </div>
                )
            }
        </>
    )
}