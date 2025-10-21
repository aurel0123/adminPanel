import {DishesProvider} from "@/features/dishes/components/dishes-provider.tsx";
import Dishes from "@/features/dishes/Dishes.tsx";

export default function Index() {
    return (
        <DishesProvider>
            <Dishes/>
        </DishesProvider>
    )
}