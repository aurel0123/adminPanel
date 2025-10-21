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
type Restaurant = {
    idRestaurant?: string,
    owner?: string,
    owner_name? : string,
    nameRestaurant : string,
    imageRestaurant : string,
    location : string,
    latitude : number,
    longitude : number,
    categories?: [],
    dishes?: [] ,
    total_dishes?: number ,
    total_categories?: number
}

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loginUser: (credentials: Auth) => Promise<{ success: boolean; error?: any }>;
    logoutUser: () => Promise<void>;
    getRestaurantUser : (id : string) => Promise<Restaurant|null>;
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

type ImagekitUploadProps = {
    folder: string;
    onUploadSuccess?: (url: string) => void;
    onUploadError?: (error: any) => void;
    acceptedFileTypes?: string;
};

type RestaurantStore = {
    idRestaurant: string | null;
    data?: Restaurant;
    setRestaurantId: (id: string) => void;
    clearRestaurantId: () => void;
    setRestaurantData: (data: Restaurant) => void;
    clearRestaurantData?: () => void;
};

type Categorie  ={
    idCategory?: string;
    restaurant?: string;
    restaurant_name?: string;
    name: string;
    restaurant?: string;
    description?: string;
}

type Dishe = {
    idDish?: string
    nameDish: string,
    restaurant?: string,
    category?: string,
    category_name?: string,
    price: number,
    imageDish: string,
    description?: string,
    specificity?:string
}