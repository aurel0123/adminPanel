import {useCategories} from "@/features/categories/components/categorie-provider.tsx";
import {Download, Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export default function CategoriesPrimaryButtons() {
    const {setOpen} = useCategories()
    return(
        <div className="flex gap-2">
            <Button
                variant='outline'
                className='space-x-1'
                onClick={() => setOpen('import')}
            >
                <span>Import</span> <Download size={18} />
            </Button>
            <Button className='space-x-1' onClick={() => setOpen('create')}>
                <span>Create</span> <Plus size={18} />
            </Button>
        </div>
    )
}