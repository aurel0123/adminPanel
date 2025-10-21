import axiosClient from "@/api/axiosClient.ts";
import type {Dishe} from "@/types/global";

export const getDishes = async () => {
    try{
        const restaurant_id = localStorage.getItem("idRestaurant");
        if(restaurant_id){
            const response = await axiosClient.get(`api/restaurants/${restaurant_id}/dishes/`);
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.results,
                }
            } else {
                return {
                    success: false,
                    data: [],
                    message : "Erreur lors de la récupération des plats"
                }
            }
        }
    }catch (e) {
        console.error(e);
    }
}

export const createDishe = async (dishe: Dishe) => {
    try {
        const response = await axiosClient.post("api/dishes/create/", dishe);
        if(response.status === 201) {
            return {
                success: true,
                data: response.data,
                message: "Le plat a été créé avec succès"
            }
        }else {
            return {
                success: false,
                data: [],
                message: "Un problème est survenu lors de la création"
            }
        }
    }catch (e) {
        console.error(e);
    }
}

type updateDisheData = Partial<Omit<Dishe , "idDish">>
export const updateDishe = async (dishe: updateDisheData , id : string) => {
    try{
        const response = await axiosClient.put(`api/dishes/${id}/update/` , dishe); 
        if(response.status === 200){
            return {
                success : true,
                data : response.data,
                message : "Le plat a été modifié avec succès"
            }
        }else{
            return{
                success : false,
                data : [],
                message : "Un problème est survenu lors de la modification"
            }
        }
    } catch(e){
        console.log(e)
    }
}

export const deleteDishe = async (id : string) => {
    try{
        const response = await axiosClient.delete(`/api/dishes/${id}/delete/`);
        if(response.status === 204){
            return {
                success : true , 
                message : "Le plat a été supprimé avec succès"
            }
        }else {
            return {
                success : false , 
                message : "Un problème est survenu lors de la suppression"
            }
        }
    }catch(e){
        console.error(e)
    }
}