import React, {useEffect, useState} from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Categorie } from '../data/schema'
import {getCategorie} from "@/api/categories.api.ts";

type CategoriesDialogType = 'create' | 'update' | 'delete' | 'import'

type CategoriesContextType = {
    open: CategoriesDialogType | null
    setOpen: (str: CategoriesDialogType | null) => void
    currentRow: Categorie | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Categorie | null>>
    categories: Categorie[]
    refreshCategories: () => Promise<void>
}

const CategoriesContext = React.createContext<CategoriesContextType | null>(null)

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<CategoriesDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Categorie | null>(null)
    const [categories, setCategories] = useState<Categorie[]>([])

    const refreshCategories = async () => {
        try {
            const response = await getCategorie()
            if (!response) throw new Error("Categories not found!")
            setCategories(response.results)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        refreshCategories()
    }, [])

    return (
        <CategoriesContext value={{ open, setOpen, currentRow, setCurrentRow , categories  , refreshCategories }}>
            {children}
        </CategoriesContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
    const categoriesContext = React.useContext(CategoriesContext)

    if (!categoriesContext) {
        throw new Error('useTasks has to be used within <CategoriesContext>')
    }

    return categoriesContext
}