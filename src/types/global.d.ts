import type {LucideIcon} from "lucide-react";

type Auth = {
    email : string ,
    password : string ,
    rememberMe? : boolean ,
}

type User = {
    id : string ,
    full_name : string ,
    email : string,
    phone : string,
    type_user : "restaurateur" | "consumer" | "admin",
}

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loginUser: (credentials: Auth) => Promise<{ success: boolean; error?: any }>;
    logoutUser: () => Promise<void>;
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
}

interface Team {
    name : string,
    logo :React.ElementType,
    plan : string,
}

interface  Items {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}
