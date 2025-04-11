"use client";

import { deletePhoneById } from "@/app/lib/actions/client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export default function DeletePhone({
  phone,
  id,
  onDelete,
}: {
  phone: string;
  id: number;
  onDelete: (id: number) => void; // Prop pour notifier la suppression
}) {
  const handleDelete = async () => {
    const res = await deletePhoneById(id);
    if (res.success) {
      console.log("Le téléphone est supprimé :", phone);
      onDelete(id); // On appelle la fonction onDelete pour mettre à jour la liste
    } else {
      console.log("Erreur lors de la suppression");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-gray-500 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le numéro
            <span className="font-bold text-red-700"> {phone}</span> ?
            <br />
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-500">
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
