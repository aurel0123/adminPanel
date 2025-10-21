import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import React, {useEffect} from "react";
import {DropDown} from "@/features/dishes/components/drop-down.tsx";
import {ButtonAddPrimary} from "@/features/dishes/components/button-add-primary.tsx";
import { MyRestaurantCategories } from "@/api/categories.api";
import { useDishes } from "./dishes-provider";
import DishesGrid from "./grid-dishes";
import ListesDishes from "./listes-dishes";


export  const  DataDishes = () =>  {
    const {dishes ,viewMode} = useDishes(); 
    const [selectedCategory , setSelectedCategory] = React.useState<string>("Tout")
    const [listCategory , setListCategory] = React.useState<string[]>([])
    const getCategoriesName = async () => {
        try{
            const response = await MyRestaurantCategories()
            if (response?.success) {
                setListCategory(response.data)
            }
        }catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getCategoriesName()
    } , [])
    const filteredDishes = selectedCategory === "Tout" ? dishes : dishes?.filter((dish) => dish.category_name === selectedCategory);
    return (
        <div>
            {
                viewMode === 'grid' &&(
                    <>
                        <div className={"flex justify-between items-center mt-4"}>
                            <Tabs defaultValue={"Tout"} value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                                <TabsList>
                                    {
                                        listCategory.map((category) => (
                                            <TabsTrigger value={`${category}`} key={category}>
                                                {category}
                                            </TabsTrigger>
                                        ))
                                    }
                                </TabsList>
                            </Tabs>
                            <div className={"flex gap-2"}>
                                <DropDown/>
                                <ButtonAddPrimary/>
                            </div>
                        </div>
                        {
                            viewMode === 'grid' && (
                                <DishesGrid data={filteredDishes}/>
                            )
                        }
                    </>
                )
            }
            {
                viewMode === 'list' &&(
                    <ListesDishes/>
                )
            }
        </div>
    )
}