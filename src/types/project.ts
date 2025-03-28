import { z } from 'zod';

export const projectSchema = z.object({
  nom: z.string().min(1, 'Le nom du projet est requis'),
  note: z.string().optional(),

  type: z.enum(['CTP', 'CTF']),

  nbPlaque_Film: z.number().int().min(1, 'Le nombre de plaques/film doit être un entier positif'),

  // for CTP 
  typePlaque: z.enum(['SM74', 'SM72', 'GTO', 'MO']).optional(),

  // for CTF 
  dimension_x: z.number().min(0, 'La dimension X doit être un nombre positif').optional(),
  dimension_y: z.number().min(0, 'La dimension Y doit être un nombre positif').optional(),

  unitPrice: z.number().min(0, 'Le prix unitaire doit être un nombre positif'),
  expectedPrice: z.number().min(0, 'Le prix attendu doit être un nombre positif'),
  additionalFees: z.number().default(0),
  finalPrice: z.number().min(0, 'Le prix final doit être un nombre positif'),

  nbTaches: z.number().int().min(1, 'Le nombre de tâches doit être un entier positif'),

  img: z
    .instanceof(File, { message: 'L\'image du projet doit être un fichier valide' }) // Validate file upload
    .optional(),

  clientId: z.number(),

  taches: z.array(
    z.object({
        nbPlaque_Film: z.number().int().min(1, 'Le nombre de plaques doit être un entier positif'),
    })
  ).optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
