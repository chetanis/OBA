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

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateClient } from "@/app/lib/actions/client";
import ConfirmClientUpdateDialog from "./ConfirmClientUpdateDialog";
import { UpdateClientFormData, updateClientSchema } from "@/types/client";
import PhoneList from "../PhoneListeClient";
 // <-- importer le 2e composant




export default function UpdateClientDialog({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (client: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // <- nouveau état

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateClientFormData>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      nom: data.nom,
      nomCommercial: data.nomCommercial,
      email: data.email,
      adresse: data.adresse,
      nrc: data.nrc,
      nif: data.nif,
      ai: data.ai,
      nis: data.nis,
      plaquePrix: data.plaquePrix,
      filmPrix: data.filmPrix,
    },
  });

  const onSubmit = async (formData: UpdateClientFormData) => {
    const res = await updateClient(data.id, formData);

    if (res.success) {
      onUpdate({ ...data, ...formData });
      setOpen(false); // Fermer dialog principal

      setTimeout(() => {
        setConfirmOpen(true); // Ouvrir le dialog de confirmation
      }, 100);
    } else {
      console.log("Échec de la modification");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 mt-6 text-base"
          >
            Modifier informations du client
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] text-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier les informations du client</DialogTitle>
            <DialogDescription>
              Modifiez uniquement les champs nécessaires. Les autres seront laissés inchangés.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" {...register("nom")} />
              {errors.nom && <p className="text-red-500 text-xs">{errors.nom.message}</p>}
            </div>

            <div>
              <Label htmlFor="nomCommercial">Nom Commercial</Label>
              <Input id="nomCommercial" {...register("nomCommercial")} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="adresse">Adresse</Label>
              <Input id="adresse" {...register("adresse")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nrc">NRC</Label>
                <Input id="nrc" {...register("nrc")} />
              </div>
              <div>
                <Label htmlFor="nif">NIF</Label>
                <Input id="nif" {...register("nif")} />
              </div>
              <div>
                <Label htmlFor="ai">AI</Label>
                <Input id="ai" {...register("ai")} />
              </div>
              <div>
                <Label htmlFor="nis">NIS</Label>
                <Input id="nis" {...register("nis")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plaquePrix">Prix Plaque</Label>
                <Input id="plaquePrix" type="number" step="any" {...register("plaquePrix", { valueAsNumber: true })} />
                {errors.plaquePrix && <p className="text-red-500 text-xs">{errors.plaquePrix.message}</p>}
              </div>
              <div>
                <Label htmlFor="filmPrix">Prix Film</Label>
                <Input id="filmPrix" type="number" step="any" {...register("filmPrix", { valueAsNumber: true })} />
                {errors.filmPrix && <p className="text-red-500 text-xs">{errors.filmPrix.message}</p>}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit">Modifier</Button>
            </DialogFooter>
          </form>
          <PhoneList telephones={[{id:1,number:"0550080333"}]} onDeletePhone={()=>{}} />
        </DialogContent>
      </Dialog>

      {/* Le 2ème Dialog de confirmation */}
      <ConfirmClientUpdateDialog open={confirmOpen} setOpen={setConfirmOpen} />
    </>
  );
}
