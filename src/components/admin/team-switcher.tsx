
import { ChevronsUpDown } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import type {Team} from "@/types/global";

export function TeamSwitcher({team}: {team : Team}) {

    if (!team) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                    <div >
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <team.logo className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{team.name}</span>
                                <span className="truncate text-xs">{team.plan}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
