"use client"

import { useState } from "react"
import { User, Building, Mail, MapPin, FileText, DollarSign, Phone } from "lucide-react"
import PhoneList from "./PhoneListeClient"
import UpdateClientDialog from "./ModefierClient/UpdetClient"
import AddPhoneDialog from "./ModefierClient/AddPhoneNumber"
import { Card, CardContent } from "@/components/ui/card"

const ClientInfo = ({ data1 }: { data1: any }) => {
  const [data, setdataClient] = useState(data1)

  // Fonction pour supprimer un téléphone
  const handleDeletePhone = (phoneId: number) => {
    setdataClient((prevData: { telephone: any[] }) => ({
      ...prevData,
      telephone: prevData.telephone.filter((tel) => tel.id !== phoneId),
    }))
  }

  if (!data) {
    return (
      <p className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">Aucune donnée client disponible.</p>
    )
  }

  const clientFields = [
    { label: "Nom", value: data.nom, icon: <User className="text-blue-500" size={18} /> },
    { label: "Nom Commercial", value: data.nomCommercial, icon: <Building className="text-red-500" size={18} /> },
    { label: "Email", value: data.email, icon: <Mail className="text-orange-500" size={18} /> },
    { label: "Adresse", value: data.adresse, icon: <MapPin className="text-blue-500" size={18} /> },
    { label: "NRC", value: data.nrc, icon: <FileText className="text-yellow-500" size={18} /> },
    { label: "NIF", value: data.nif, icon: <FileText className="text-yellow-500" size={18} /> },
    { label: "AI", value: data.ai, icon: <FileText className="text-yellow-500" size={18} /> },
    { label: "NIS", value: data.nis, icon: <FileText className="text-yellow-500" size={18} /> },
    { label: "Plaque Prix", value: data.plaquePrix, icon: <DollarSign className="text-green-500" size={18} /> },
    { label: "Film Prix", value: data.filmPrix, icon: <DollarSign className="text-green-500" size={18} /> },
    { label: "Phone numnetr", value: "0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381 - 0549128381", icon: <Phone className="text-green-500" size={18} /> },
  ]

  return (
    <div className="space-y-8">
      {/* Informations du client */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Informations du Client</h2>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="divide-y divide-gray-200">
              {clientFields.map(({ label, value, icon }, index) => (
                <div key={index} className="grid grid-cols-12 py-3.5 items-center">
                  <div className="col-span-3 flex items-center text-gray-700">
                    <span className="p-1.5 bg-gray-50 rounded-md mr-2">{icon}</span>
                    <span className="font-medium text-sm">{label}</span>
                  </div>
                  <div className="col-span-9 text-gray-900 font-semibold text-sm">
                    {value || <span className="text-gray-400 italic">n'est pas mentionné</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Mise à jour des informations du client */}
            <div className="mt-4 flex justify-end">
              <UpdateClientDialog data={data} onUpdate={(updatedClient) => setdataClient(updatedClient)} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations des contacts du client */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Contacte du Client</h2>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            {/* Liste des téléphones du client */}
            <PhoneList telephones={data.telephone} onDeletePhone={handleDeletePhone} />

            {/* Ajouter un téléphone */}
            <div className="mt-4 flex justify-end">
              <AddPhoneDialog
                data1={data}
                onUpdate={(updatedClient) => {
                  setdataClient((prev: { telephone: any }) => ({
                    ...prev,
                    telephone: [...(prev?.telephone || []), ...(updatedClient.telephone || [])],
                  }))
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClientInfo
