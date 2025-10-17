import { Plus} from "lucide-react"

import {
    SidebarGroup, SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import {useNavigate} from "react-router-dom"
export function NavBoutton() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/restaurateur/restaurant/add')
    }
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem className="">
                        <SidebarMenuButton
                            onClick = {() => handleClick()}
                            tooltip="Quick Create"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                        >
                            <Plus />
                            <span>Créer votre restaurant</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>

        </SidebarGroup>
    )
}
