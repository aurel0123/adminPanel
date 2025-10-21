import {
    Users,
    LayoutDashboard,
    Cog,
    GalleryVerticalEnd,
    Layers,
    Banknote,
    Info,
    Bookmark,
    ShoppingCart,
    UsersRound,
    Utensils,
    ChartPie
} from "lucide-react";

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
    }
]
export const setting = [
    {
        title: 'Paramètres',
        icon : Cog ,
        isActive: false,
        items: [
            {
                title: "Profile",
                url: "/admin/profile",
            },
            {
                title: "Compte",
                url: "#",
            },
            {
                title: "Apparance",
                url: "#",
            },
            {
                title: "Notification",
                url: "#",
            },
            {
                title: "Affichage",
                url: "#",
            },
        ],
    },
    {
        title: 'Aide & Support',
        icon : Info,
        url : "/admin/help",
    }
]
export const navRestaurateur = [
    {
        title: 'Tableau de bord',
        icon : LayoutDashboard ,
        url : "/restaurateur/tableau-de-bord"
    },
    {
        title: 'Reservations',
        icon : Bookmark ,
        url : '/restaurateur/reservations'
    },
    {
        title: 'Commandes',
        icon : ShoppingCart ,
        url : '/restaurateur/commandes'
    },
    {
        title: 'Categories',
        icon : Layers ,
        url : '/restaurateur/categories'
    },
    {
        title: 'Clients',
        icon : UsersRound ,
        url : '/restaurateur/clients'
    },
    {
        title: 'Plats',
        icon : Utensils ,
        url : '/restaurateur/plats'
    },
    {
        title: 'Avis',
        icon : ChartPie ,
        url : '/restaurateur/commandes'
    },
]
export const team = {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Administrateur",
};
export const teamRestaurateur = {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Restaurateur",
};

export const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
};