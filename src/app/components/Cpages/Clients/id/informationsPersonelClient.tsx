import React, { useState } from "react";
import { User, Building, Mail, MapPin, FileText, DollarSign } from "lucide-react";
import PhoneList from "./PhoneListeClient";
import UpdateClientDialog from "./ModefierClient/UpdetClient";
import AddPhoneDialog from "./ModefierClient/AddPhoneNumber";

const ClientInfo = ({ data1 }: { data1: any }) => {
  const [data, setdataClient] = useState(data1);
  console.log(data1);
  // Fonction pour supprimer un téléphone
  const handleDeletePhone = (phoneId: number) => {
    setdataClient((prevData: { telephone: any[] }) => ({
      ...prevData,
      telephone: prevData.telephone.filter((tel) => tel.id !== phoneId),
    }));
  };

  if (!data) {
    return <p className="text-red-500">Aucune donnée client disponible.</p>;
  }

  return (
    <div className="mb-8">
      {/* Informations du client */}
      <h2 className="text-2xl font-bold text-gray-900 my-8">Informations du Client</h2>
      <div className="bg-white rounded-lg text-xs mx-auto px-11">
        <div className="divide-y divide-gray-300">
          {[ 
            { label: "Nom", value: data.nom, icon: <User className="text-blue-500" /> },
            { label: "Nom Commercial", value: data.nomCommercial, icon: <Building className="text-red-500" /> },
            { label: "Email", value: data.email, icon: <Mail className="text-orange-500" /> },
            { label: "Adresse", value: data.adresse, icon: <MapPin className="text-blue-500" /> },
            { label: "NRC", value: data.nrc, icon: <FileText className="text-yellow-500" /> },
            { label: "NIF", value: data.nif, icon: <FileText className="text-yellow-500" /> },
            { label: "AI", value: data.ai, icon: <FileText className="text-yellow-500" /> },
            { label: "NIS", value: data.nis, icon: <FileText className="text-yellow-500" /> },
            { label: "Plaque Prix", value: data.plaquePrix, icon: <DollarSign className="text-green-500" /> },
            { label: "Film Prix", value: data.filmPrix, icon: <DollarSign className="text-green-500" /> }
          ].map(({ label, value, icon }, index) => (
            <div key={index} className="grid grid-cols-4 py-3 items-center">
              <div className="flex items-center text-gray-700 text-left">
                {icon}
                <span className="ml-2 font-medium">{label}</span>
              </div>
              <div></div>
              <div className="text-gray-900 font-semibold text-right flex justify-start">
                {value || "n'est pas mentionné"}
              </div>
            </div>
          ))}
        </div>

        {/* Mise à jour des informations du client */}
        <UpdateClientDialog data={data} onUpdate={(updatedClient) => setdataClient(updatedClient)} />
      </div>

      {/* Informations des contacts du client */}
      <h2 className="text-2xl font-bold text-gray-900 py-6">Contacte du Client</h2>
      <div className="px-11">
        {/* Liste des téléphones du client */}
        <PhoneList telephones={data.telephone} onDeletePhone={handleDeletePhone} />

        {/* Ajouter un téléphone */}
        <AddPhoneDialog 
          data1={data} 
          onUpdate={(updatedClient) => {
            setdataClient((prev: { telephone: any; }) => ({
              ...prev,
              telephone: [...(prev?.telephone || []), ...(updatedClient.telephone || [])],
            }));
          }} 
        />
      </div>
    </div>
  );
};

export default ClientInfo;
