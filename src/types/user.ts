import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["admin", "infographe","employe"]).default("employe"),
});

// Schéma pour la mise à jour d'un utilisateur (mot de passe optionnel)
export const updateUserSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur est requis"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
  role: z.enum(["admin", "infographe","employe"]).optional(),
});
