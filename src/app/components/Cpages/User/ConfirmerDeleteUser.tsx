import { Trash2 } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog";

type DeleteUserButtonProps = {
  username: string;
  onDelete: (username: string) => void;
};

export default function DeleteUserButton({ username, onDelete }: DeleteUserButtonProps) {
  function handleDelete() {
    onDelete(username);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-gray-500 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
          <AlertDialogDescription>
          Êtes-vous sûr de supprimer utilisateurs <span className="font-bold text-red-700"> {username} </span>?
          <br />
            Cette action est irréversible. L'utilisateur sera définitivement supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-500">Confirmer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
