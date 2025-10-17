import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import {SideBar} from "@/components/admin/SideBar.tsx";
import {Outlet} from "react-router-dom";
import Header from "@/components/admin/header.tsx";
import {Toaster} from "@/components/ui/sonner"

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <Toaster richColors  />
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
