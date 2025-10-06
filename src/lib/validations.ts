import { z } from "zod";

export const FormAuth = z.object({
    email: z.string().email("L'email est invalide"),
    password: z
        .string()
        .min(12, "Le mot de passe doit contenir au moins 12 caractères")
        .max(100, "Le mot de passe ne doit pas dépasser 100 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});
