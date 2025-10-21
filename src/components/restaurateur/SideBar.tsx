import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {TeamSwitcher} from "@/components/restaurateur/team-switcher.tsx";
import {navRestaurateur, setting, teamRestaurateur, user} from "@/constant";
import {NavUser} from "@/components/restaurateur/nav-user.tsx";
import {NavMain} from "@/components/restaurateur/nav-main.tsx";
import {NavSetting} from "@/components/restaurateur/nav-setting.tsx";
import {NavBoutton} from "@/components/restaurateur/nav-boutton.tsx";


export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher team={teamRestaurateur}/>

            </SidebarHeader>
            <SidebarContent>
                <NavBoutton/>
                <NavMain items={navRestaurateur}/>
                <NavSetting items={setting}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
