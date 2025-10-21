import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {SideBar} from "@/components/restaurateur/SideBar.tsx";
import {Outlet} from "react-router-dom";
import Header from "@/components/restaurateur/header.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";


export default function RestaurateurLayout() {
    return (
        <SidebarProvider>
            <Toaster richColors  expand={true} />
            <SideBar />
            <SidebarInset>
                <Header />
                <div className="flex-1 relative overflow-y-auto focus:outline-none p-4 bg-orange-50">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
