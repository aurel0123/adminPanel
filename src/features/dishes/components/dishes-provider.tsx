import React, {useEffect, useState, useCallback} from "react";
import type {Dishe} from "@/types/global";
import useDialogState from "@/hooks/use-dialog-state.tsx";
import {getDishes} from "@/api/dishe.api.ts";

type DishesDialogType = 'create' | 'update' | 'delete' | 'details' |'all' | 'list' | 'grid'
type DisheContextType = {
    open: DishesDialogType | null ,
    setOpen:(str : DishesDialogType | null) => void ,
    viewMode: "grid" | "list" | null,
    setViewMode: (str: "grid" | "list" | null) => void,
    currentItem : Dishe | undefined | null,
    setCurrentItem: React.Dispatch<React.SetStateAction<Dishe | null>>
    dishes: Dishe[],
    refreshDishes: () => Promise<void>,
}
const DishesContext = React.createContext<DisheContextType | null>(null)

export function DishesProvider({ children } : {children : React.ReactNode}) {
    const [open , setOpen] = useDialogState<DishesDialogType>(null)
    const [currentItem, setCurrentItem] = useState<Dishe | null>(null)
    const [dishes, setDishes] = useState<Dishe[]>([])
    const [viewMode, setViewMode] = useDialogState<"grid" | "list">("list");

    const refreshDishes = useCallback(async () => {
       const response = await getDishes()
        if(response?.success) {
            setDishes(response.data)
        }else {
            console.log(response?.message)
        }
    }, []);
    
    useEffect(() => {
        refreshDishes();
    }, [refreshDishes]);

    const value = React.useMemo(() => ({
        open,
        setOpen,
        viewMode,
        setViewMode,
        currentItem,
        setCurrentItem,
        dishes,
        refreshDishes,
    }), [open, setOpen, viewMode, setViewMode, currentItem, setCurrentItem, dishes, refreshDishes]);

    return (
        <DishesContext.Provider value={value}>
            {children}
        </DishesContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDishes = ()=> {
    const dishesContext = React.useContext(DishesContext)
    if(!dishesContext) {
        throw new Error ('useDishes has to be used withi <DishesContext>')
    }
    return dishesContext
}