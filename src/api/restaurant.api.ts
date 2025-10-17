import {config} from "@/lib/config.ts";
import axios from "axios";
import axiosClient from "@/api/axiosClient.ts";
import type {Restaurant} from "@/types/global";

const API_URL = config.env.apiBackend || "http://127.0.0.1:8000/api/restaurants/";
export const getRestaurant = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}
export type updateRestaurantPlayload = Partial<Omit<Restaurant , "idRestaurant">>
export const getRestaurantsById = async (id : string) => {
    const response = await axiosClient.get(`${API_URL}/${id}/`);
    if(!response) {
        throw new Error("Erreur lors de la récupération");
    }
    return response.data;
}

export const createRestaurant = async ( data : Restaurant) => {
    const response = await axiosClient.post(`/api/restaurants/create/`, data);
    if(response.status !== 201) {
        throw new Error("Erreur lors de la création");
    }
    return response.data;
}

