import {Button} from "@/components/ui/button.tsx";
import {LayoutGrid, List} from "lucide-react";
import {useDishes} from "@/features/dishes/components/dishes-provider.tsx";

export const ButtonTrie = () => {
    const {viewMode ,setViewMode} = useDishes()
    return (
        <div className={"flex gap-2"}>
            <Button
                variant={"outline"}
                onClick={() => {setViewMode('list')}}
                className={viewMode === 'list' ? 'border border-orange-500' : ''}
            >
                <List size={20}/>
            </Button>
            <Button
                variant={"outline"}
                onClick={() => {setViewMode('grid')}}
                className={viewMode === 'grid' ? 'border border-orange-500' : ''}
            >
                <LayoutGrid size={20}/>
            </Button>
        </div>
    )
}