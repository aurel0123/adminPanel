import { z } from "zod";

export const FormAuth = z.object({
    email: z.email("L'email est invalide"),
    password: z
        .string()
        .min(12, "Le mot de passe doit contenir au moins 12 caractères")
        .max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});

export const RestaurantForm = z.object({
    nameRestaurant: z.string().min(1, "Nom requis"),
    imageRestaurant: z.string().min(1, "Image requise"),
    location: z.string().min(1, "Adresse requise"),
    latitude: z.number(),
    longitude: z.number()
});

export const DishSchema = z.object({
    nameDish : z.string("Veuillez saisir le nom du menu "),
    restaurant : z.string().optional(),
    category: z.string().optional(),
    price : z.number(),
    imageDish : z.string(),
    description : z.string().optional(),
    specificity : z.string().optional(),
})