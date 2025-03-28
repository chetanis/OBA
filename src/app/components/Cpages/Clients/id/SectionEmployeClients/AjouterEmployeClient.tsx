"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { createEmployeWithPhone } from "@/app/lib/actions/client"

// Schéma de validation avec Zod
//heda zod je sais que kyn 2 mais khalih yasra probleme kbir basif bech dartha 
const employeSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  fonction: z.string().min(3, "La fonction doit contenir au moins 3 caractères"),
  telephone: z.string().regex(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres"),
})

type AjouterEmployeClientProps = {
  clientId: number
  onEmployeAdded: (newEmploye: any) => void
}

const AjouterEmployeClient = ({ clientId, onEmployeAdded }: AjouterEmployeClientProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(employeSchema),
  })

  const onSubmit = async (formData: any) => {
    try {
      const employeData = {
        nom: formData.nom,
        fonction: formData.fonction,
        telephone: [{ number: formData.telephone }]
      }
      
      const newEmploye = await createEmployeWithPhone(clientId, employeData)

      onEmployeAdded(newEmploye)

      setSuccessMessage("L'employé a été ajouté avec succès !")
      reset()

      // Masquer le message après 5 secondes
      setTimeout(() => setSuccessMessage(null), 5000)

    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
      setSuccessMessage("Échec de l'ajout de l'employé.")
      
      // Masquer le message après 5 secondes
      setTimeout(() => setSuccessMessage(null), 5000)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 mt-6 text-base">
          Ajouter un employé
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-auto p-0">
        <AlertDialogHeader>
          <Card className="w-96 shadow-lg">
            <CardHeader>
              <AlertDialogTitle>Ajouter un employé</AlertDialogTitle>
              <CardDescription>Veuillez remplir les informations ci-dessous</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-gray-700">Nom</label>
                  <input
                    type="text"
                    placeholder="Entrez le nom"
                    className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full"
                    {...register("nom")}
                    disabled={isSubmitting}
                  />
                  {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message?.toString()}</p>}
                </div>

                <div>
                  <label className="block text-gray-700">Fonction</label>
                  <input
                    type="text"
                    placeholder="Entrez la fonction"
                    className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full"
                    {...register("fonction")}
                    disabled={isSubmitting}
                  />
                  {errors.fonction && <p className="text-red-500 text-sm">{errors.fonction.message?.toString()}</p>}
                </div>

                <div>
                  <label className="block text-gray-700">Téléphone</label>
                  <input
                    type="text"
                    placeholder="Entrez le numéro de téléphone"
                    className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full"
                    {...register("telephone")}
                    disabled={isSubmitting}
                  />
                  {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message?.toString()}</p>}
                </div>

                {/* Affichage du message de succès ou d'erreur */}
                {successMessage && (
                  <div className={`p-2 rounded-md text-center text-sm font-bold ${
                    successMessage.includes("succès") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {successMessage}
                  </div>
                )}

                <CardFooter className="flex justify-end space-x-2">
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" type="button" onClick={() => reset()} disabled={isSubmitting}>
                      Annuler
                    </Button>
                  </AlertDialogTrigger>
                  <Button type="submit" className="bg-blue-200 text-blue-600 hover:bg-blue-100" disabled={isSubmitting}>
                    {isSubmitting ? "En cours..." : "Ajouter"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AjouterEmployeClient
