import { create } from 'zustand';
import type {RestaurantStore} from "@/types/global";


export const useRestaurantStore = create<RestaurantStore>((set) => ({
    idRestaurant: null,
    data : undefined,
    setRestaurantId: (id) => set({ idRestaurant: id }),
    clearRestaurantId: () => set({ idRestaurant: null }),
    setRestaurantData: (data) => set({ data }),
    clearRestaurantData: () => set({ data: undefined }),
}));
