"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function ConfirmClientUpdateDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-sm text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600">✅ Client modifié avec succès</DialogTitle>
          <DialogDescription>
            Les informations du client ont été mises à jour avec succès.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center mt-4">
          <Button onClick={() => setOpen(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
