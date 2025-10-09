import {Users, LayoutDashboard, Cog, GalleryVerticalEnd, SquareTerminal , Layers , Banknote} from "lucide-react";

export const navMain = [
    {
        title: 'Dashboard',
        icon : LayoutDashboard ,
        url : "/admin/tableau-de-bord"
    },
    {
        title: 'Restaurants',
        icon : Layers ,
        url : "/admin/restaurants"
    },
    {
        title: 'payemment & Commisions',
        icon : Banknote ,
        url : "/admin/payment"
    },
    {
        title: 'Utilisateurs',
        icon : Users ,
        url : "/admin/users",
    },
    {
        title: 'Paramètres',
        icon : Cog ,
        url : "/admin/settings"
    },
    {
        title: "Playground",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "History",
                url: "/admin/history",
            },
            {
                title: "Starred",
                url: "#",
            },
            {
                title: "Settings",
                url: "#",
            },
        ],
    },
]

export const team = {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Administrateur",
};

export const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
};