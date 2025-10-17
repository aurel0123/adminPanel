import {Toaster} from "sonner";
import CategoriesPrimaryButtons from "@/features/categories/components/categories-primary-buttons.tsx";
import DataTable from "@/features/categories/components/data-table.tsx";
import {CategoriesDialogs} from "@/features/categories/components/categories-dialogs.tsx";
import {useCategories} from "@/features/categories/components/categorie-provider.tsx";

export default function Categories() {
    const { categories } = useCategories()

    return (
        <>
            <Toaster />
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className={"text-3xl font-semibold tracking-tighter"}>Liste des catégories</h1>
                        <p>Gérer la lsite des catégories</p>
                    </div>
                    <CategoriesPrimaryButtons />
                </div>
                {
                    categories.length > 0
                        ? <DataTable results={categories} />
                        : <p>Aucune catégorie</p>
                }
            </div>
            <CategoriesDialogs />
        </>
    )
}
