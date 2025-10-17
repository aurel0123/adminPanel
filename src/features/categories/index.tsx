import {CategoriesProvider} from "@/features/categories/components/categorie-provider.tsx";
import Categories from "@/features/categories/categories.tsx";


export default  function Index () {
    return (
        <CategoriesProvider>
            <Categories />
        </CategoriesProvider>
    )
}