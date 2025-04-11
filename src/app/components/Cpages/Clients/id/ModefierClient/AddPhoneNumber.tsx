"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPhoneToClient } from "@/app/lib/actions/client";
import { useState } from "react";

// Schéma Zod pour le téléphone
const phoneSchema = z.object({
  number: z
    .string()
    .regex(/^\d{10}$/, "Le numéro de téléphone doit contenir exactement 10 chiffres"),
});
type PhoneFormData = z.infer<typeof phoneSchema>;

export default function AddPhoneDialog({
  data1,
  onUpdate,
}: {
  data1: any;
  onUpdate: (client: any) => void;
}) {
  const [open, setOpen] = useState(false); // État pour gérer l'ouverture/fermeture du dialogue

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = async (data: PhoneFormData) => {
    const res = await addPhoneToClient(data1.id, data);

    if (res.success) {
      console.log("phone ajouté");

      // Ajouter un id temporaire (s'il n'est pas renvoyé par l'API)
      const newPhone = {
        ...data,
        id: res.data?.id, // <- id temporaire
      };

      // Mise à jour des téléphones
      onUpdate({
        telephone: [newPhone],
      });

      // Fermer la fenêtre de dialogue après succès
      setOpen(false);
    } else {
      console.log("phone non ajouté");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 mt-6 text-base"
          onClick={() => setOpen(true)} // Ouvre la fenêtre de dialogue
        >
          Ajouter Un numéro de téléphone
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un numéro de téléphone</DialogTitle>
          <DialogDescription>Entrez un numéro valide.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="number">Numéro</Label>
            <Input id="number" {...register("number")} />
            {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
