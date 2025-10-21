import { Button } from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {ListFilter} from "lucide-react";

export const DropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <ListFilter/> Trier par
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}