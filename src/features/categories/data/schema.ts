import {z} from "zod"

export const CategorieSchema = z.object({
    restaurant: z.string().optional(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
})

export type Categorie = {
    idCategory? : string,
    restaurant? : string,
    restaurant_name? : string,
    name : string,
    description : string,
    icon?: string,
}