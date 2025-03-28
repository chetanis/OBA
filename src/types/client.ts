import { z } from 'zod';

// Schéma pour un téléphone
const phoneSchema = z.object({
  number: z.string().min(1, 'Le numéro de téléphone est requis'),
});

// Schéma pour un employé avec la fonction ajoutée
export const employeSchema = z.object({
  nom: z.string().min(1, "Le nom de l'employé est requis"),
  fonction: z.string().min(1, "La fonction de l'employé est requise"), // Ajouté ici
  telephone: z.array(phoneSchema).optional(),
});

export type EmployeFormData = z.infer<typeof employeSchema>;

// Schéma pour un client incluant la liste des employés et téléphones
export const clientSchema = z.object({
  nom: z.string().min(1, "Le nom du client est requis"),
  nomCommercial: z.string().optional(),
  email: z.string().email("L'email doit être valide").optional(),
  adresse: z.string().optional(),
  nrc: z.string().optional(),
  nif: z.string().optional(),
  ai: z.string().optional(),
  nis: z.string().optional(),
  plaquePrix: z.number().min(0, "Le prix de la plaque doit être un nombre positif"),
  filmPrix: z.number().min(0, "Le prix du film doit être un nombre positif"),
  telephone: z.array(phoneSchema).optional(),
  employes: z.array(employeSchema).optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

