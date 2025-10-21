import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useDishes} from "@/features/dishes/components/dishes-provider.tsx";

export const ButtonAddPrimary = () => {
    const {setOpen} = useDishes()
    return (
        <div>
            <Button
                onClick={() => {setOpen('create')}}
            >
                Nouveau Plat <Plus size={18}/>
            </Button>
        </div>
    )
}