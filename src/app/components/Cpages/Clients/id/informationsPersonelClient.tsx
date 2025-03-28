import React from "react";
import { User, Building, Mail, MapPin, FileText, DollarSign } from "lucide-react";
import PhoneList from "./PhoneListeClient";

interface ClientInfoProps {
  data: {
    id: number;
    nom: string;
    nomCommercial?: string;
    email?: string;
    adresse?: string;
    nrc?: string;
    nif?: string;
    ai?: string;
    nis?: string;
    plaquePrix?: number;
    filmPrix?: number;
    telephone?: {
      id: number;
      number: string;
      clientId: number | null;
      employeId: number | null;
    }[];
    employes?: {
      id: number;
      nom: string;
      clientId: number | null;
    }[];
    projects?: {
      id: number;
      type: string; // Remplacez `ProjectType` par le type réel si nécessaire
      // Ajoutez les autres champs si nécessaire
    }[];
  } | null;
}

const ClientInfo = ({ data }: { data: any }) => {
  if (!data) {
    return <p className="text-red-500">Aucune donnée client disponible.</p>;
  }

  return (
    <div className="mb-8">
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
            { label: "Film Prix", value: data.filmPrix, icon: <DollarSign className="text-green-500" /> },
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
        <button type="submit" className="py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 mt-6 text-base">
          Modifier informations du client
        </button>
        
      </div>

      <h2 className="text-2xl font-bold text-gray-900 py-6">Contacte du Client</h2>
        <PhoneList telephones={data.telephone}/>
    </div>
  );
};

export default ClientInfo;