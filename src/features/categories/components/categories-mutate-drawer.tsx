import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {type Categorie, CategorieSchema} from '../data/schema'
import {Textarea} from "@/components/ui/textarea.tsx";
import {createCategorie, updateRestaurant} from "@/api/categories.api.ts";
import {toast} from "sonner";
import {useCategories} from "@/features/categories/components/categorie-provider.tsx";

type TaskMutateDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentRow?: Categorie
}


type CategorieForm = z.infer<typeof CategorieSchema>

export function CategoriesMutateDrawer({open, onOpenChange, currentRow,}: TaskMutateDrawerProps) {
    const isUpdate = !!currentRow
    const {refreshCategories} = useCategories()
    const form = useForm<CategorieForm>({
        resolver: zodResolver(CategorieSchema),
        defaultValues: currentRow ?? {
            name:"",
            description : "",
            icon : ""
        },
    })

    const onSubmit = async  (data: CategorieForm) => {

        onOpenChange(false)
        form.reset()

        try {
            const idRestaurant = localStorage.getItem("idRestaurant")
            if(!idRestaurant) {
                console.error("ID du restaurant introuvable dans le localStorage.");
                return;
            }
            const CategoryData = {
                restaurant : idRestaurant,
                ...data ,
            }
            if(isUpdate) {
                const id : string | undefined =  currentRow?.idCategory
                const response = await updateRestaurant(CategoryData ,id) ;
                if(response.success) {
                    toast.success(response.message)
                    await refreshCategories()
                }else{
                    toast.error("Erreur de la modification",{
                        description: "Erreur lors de la modification",
                    })
                }
            } else {
                const response = await createCategorie(CategoryData)
                if(!response){
                    throw new Error("Erreur lors d ela création")
                }else {
                    toast.success("Categorie créer avec succès")
                    await refreshCategories()
                }
            }
        }catch (e) {
            console.error(e)
        }


    }

    return (
        <Sheet
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v)
                form.reset()
            }}
        >
            <SheetContent className='flex flex-col'>
                <SheetHeader className='text-start'>
                    <SheetTitle>{isUpdate ? 'Update' : 'Create'} Categorie</SheetTitle>
                    <SheetDescription>
                        {isUpdate
                            ? 'Update the categorie by providing necessary info.'
                            : 'Add a new Categorie by providing necessary info.'}
                        Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        id='categories-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex-1 space-y-6 overflow-y-auto px-4'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de la categorie</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Enter le nom de la categorie' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Entrer une description..."
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='icon'
                            render={({ field }) => (
                                <FormItem className='relative'>
                                    <FormLabel>Icon (optionnel)</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} placeholder={"Choisir une icone"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <SheetFooter className='gap-2'>
                    <SheetClose asChild>
                        <Button variant='outline'>Fermer</Button>
                    </SheetClose>
                    <Button form='categories-form' type='submit'>
                        {isUpdate ? 'Update changement' : 'Sauvegarder les changements'}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}