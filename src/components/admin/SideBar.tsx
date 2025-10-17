import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {TeamSwitcher} from "@/components/admin/team-switcher.tsx";
import {navMain, setting, team, user} from "@/constant";
import {NavUser} from "@/components/admin/nav-user.tsx";
import {NavMain} from "@/components/admin/nav-main.tsx";
import {NavSetting} from "@/components/admin/nav-setting.tsx";


export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher team={team}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavSetting items={setting}/>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
