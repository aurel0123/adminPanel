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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea.tsx";
import type {Dishe} from "@/types/global";
import {DishSchema} from "@/lib/validations.ts";
import ImageUpload from "@/components/ImageUpload.tsx";
import {getCategorie} from "@/api/categories.api.ts";
import {useEffect, useState} from "react";
import type {Categorie} from "@/features/categories/data/schema.ts";
import {createDishe, updateDishe} from "@/api/dishe.api.ts";
import {toast} from "sonner";
import {useDishes} from "@/features/dishes/components/dishes-provider.tsx";

type DishMutateDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentItem?: Dishe
}


type DishForm = z.infer<typeof DishSchema>

export function DishesMutateDrawer({open, onOpenChange, currentItem,}: DishMutateDrawerProps) {
    const isUpdate = !!currentItem
    const {refreshDishes} = useDishes()
    const [categories, setCategories] = useState<Categorie[]>([])
    const restaurant = localStorage.getItem("idRestaurant") ?? undefined;
    const form = useForm<DishForm>({
        resolver: zodResolver(DishSchema),
        defaultValues: currentItem ?? {
            nameDish : "",
            restaurant : restaurant,
            category : "",
            price : 0 ,
            imageDish : "" ,
            description : ""
        },
    })
    console.log(currentItem)
    const ListCategory= async ()=> {
        try {
            const response = await getCategorie();
            if(response){
                setCategories(response.results)
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        ListCategory()
    }, []);
    
    useEffect(() => {
        if (currentItem && categories.length > 0 ) {
            form.reset({
                nameDish: currentItem.nameDish ?? "",
                restaurant: currentItem.restaurant ?? restaurant,
                category: currentItem.category ?? "",
                price: currentItem.price ?? 0,
                imageDish: currentItem.imageDish ?? "",
                description: currentItem.description ?? "",
            })
        } else if (!currentItem && categories.length > 0) {
            form.reset({
                nameDish : "",
                restaurant : restaurant,
                category : "",
                price : 0 ,
                imageDish : "" ,
                description : ""
            })
        }
    }, [currentItem, restaurant, form ,categories])
    
    const onSubmit = async  (data: DishForm) => {
        onOpenChange(false)
        form.reset()
        try {
            if(isUpdate) {
                console.log(data)
                const response = await updateDishe(data , currentItem?.idDish ?? "");
                if(response?.success){
                    toast.success(response.message)
                    await refreshDishes()
                }else {
                    toast.error(response?.message)
                }
            }else {
                const response = await createDishe(data)
                if(response?.success){
                    toast.success(response.message)
                    await refreshDishes()
                }else {
                    toast.error(response?.message)
                }
            }
            
        } catch (e) {
            console.log(e)
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
                    <SheetTitle>{isUpdate ? 'Modifier' : 'Créer'} Menu</SheetTitle>
                    <SheetDescription>
                        {isUpdate
                            ? 'Update the Dish by providing necessary info.'
                            : 'Add a new Dish by providing necessary info.'}
                        Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        id='dishes-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex-1 space-y-6 overflow-y-auto px-4'
                    >
                        <FormField
                            control={form.control}
                            name='nameDish'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du Menu <span className="text-red-500">*</span> </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Chawarma' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Selectionnez une categorie <span className="text-red-500">*</span> </FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Sélectionnez une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem value={category.idCategory ?? ""} key={category.idCategory}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prix du Menu <span className="text-red-500">*</span> </FormLabel>
                                    <FormControl>
                                        <Input type={"number"} {...field} placeholder='1000 CFA'
                                               onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='imageDish'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image du plat <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                            folder="/ImageDish"
                                        />
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
                                    <FormLabel>Description(optionnel)</FormLabel>
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

                    </form>
                </Form>
                <SheetFooter className='gap-2'>
                    <SheetClose asChild>
                        <Button variant='outline'>Fermer</Button>
                    </SheetClose>
                    <Button form='dishes-form' type='submit'>
                        {isUpdate ? 'Update changement' : 'Sauvegarder les changements'}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}