import {config} from "@/lib/config.ts";
import axios from "axios";
import {z} from "zod";
import type {Categorie, CategorieSchema} from "@/features/categories/data/schema.ts";
import axiosClient from "@/api/axiosClient.ts";

const API_URL = config.env.apiBackend || "http://127.0.0.1:8000/api/categories/";

type CategoryData = z.infer<typeof CategorieSchema>;
type updateCategoryData = Partial<Omit<Categorie, "idCategory">>
export const getCategorie = async () => {
    try{
        const id = localStorage.getItem("idRestaurant");
        if(!id) return;
        const response = await axios.get(`${API_URL}api/restaurants/${id}/categories/`);
        return response.data;
    } catch (e) {
        console.error(e);
    }

}

export const createCategorie = async (data: CategoryData) => {
    try{
        const response = await axiosClient.post(`${API_URL}api/categories/create/`, data);
        if(response.status === 201){
            return response.data;
        }else {
            throw new Error("Erreur lors de la création");
        }
    }catch (e){
        console.error(e);
    }
}

export const deleteCategorie = async (id: string | undefined) => {
    await axiosClient.delete(`${API_URL}api/categories/${id}/delete/`);
}

export const updateRestaurant = async (data:updateCategoryData , id :string | undefined ) => {
    const response = await axiosClient.put(`${API_URL}/api/categories/${id}/update/`, data);
    if(response.status === 200){
        return {
            data : response.data ,
            success : true,
            message : "La catégorie a été modifié avec succès"
        }
    }else {
        throw new Error ('Error lors de la modification')
    }
}

export const TryCategorie = async () => {
    try {
        const response = await getCategorie();
        if(response){
            const data: Categorie[] = response.results
            const CategoriesName: string[] = data.map((cat) => cat.name)
            return ["Tout", ...CategoriesName]
        }else {
            console.log("Tableau vide")
        }
    } catch(e){
        console.error(e);
    }
}
export const MyRestaurantCategories = async () => {
    try{
        const restaurant_id = localStorage.getItem('idRestaurant');
        if(restaurant_id) {
            const response = await axiosClient.get(`api/restaurants/${restaurant_id}/categories/my/`);
            if(response.status == 200) {
                const data = response.data;
                const CategoriesName = data.categories.map((cat: Categorie) => cat.name);
                const uniqueCategoryNames = ["Tout", ...CategoriesName];
               return {
                    success: true,
                    data: uniqueCategoryNames,
                }
            }else {
                throw  new  Error("Erreur lors dela récupération des catégories")
            }
        }
    }catch (e) {
        console.error(e)
    }

}