import {ButtonTrie} from "@/features/dishes/components/button-trie.tsx";
import {DataDishes} from "@/features/dishes/components/data-dishes.tsx";
import {DishesDialog} from "@/features/dishes/components/dishes-dialog.tsx";

export default  function Dishes () {
    return (
        <div>
            <div className={"flex gap-2 items-center"}>
                <h2 className={"text-2xl font-semibold"}>Menu</h2>
                <div className={"space-y-2"}>
                    <ButtonTrie/>
                </div>
            </div>
            <DataDishes/>
            <DishesDialog/>
        </div>
    )
}