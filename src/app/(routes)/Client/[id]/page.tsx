import PathName from "@/app/components/PathName/PathName";
import { getClientById } from "@/app/lib/actions/client";
import React from "react";
import { User, Building, Mail, MapPin, FileText, Tag, DollarSign } from "lucide-react";

const Page = async ({ params }: { params: any }) => {
  const data = await getClientById(params.id);

  const paths = [
    { label: "Home", href: "/" },
    { label: "Clients", href: "/Client" },
    { label: "Liste des Clients", href: "/Client" },
    { label: String(data?.nom) },
  ];

  return (
    <div className="p-6">
      <PathName paths={paths} />

      {/* Titre Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations du Client</h2>

      {/* Tableau d'affichage des informations */}
      <div className="bg-white rounded-lg p-6 text-xs mx-auto">
  <div className="divide-y divide-gray-300 ">
    {[
      { label: "Nom", value: data?.nom, icon: <User className="text-blue-500" /> },
      { label: "Nom Commercial", value: data?.nomCommercial, icon: <Building className="text-red-500" /> },
      { label: "Email", value: data?.email, icon: <Mail className="text-orange-500" /> },
      { label: "Adresse", value: data?.adresse, icon: <MapPin className="text-blue-500" /> },
      { label: "NRC", value: data?.nrc, icon: <FileText className="text-yellow-500" /> },
      { label: "NIF", value: data?.nif, icon: <FileText className="text-yellow-500" /> },
      { label: "AI", value: data?.ai, icon: <FileText className="text-yellow-500" /> },
      { label: "NIS", value: data?.nis, icon: <FileText className="text-yellow-500" /> },
      { label: "Plaque Prix", value: data?.plaquePrix, icon: <DollarSign className="text-green-500" /> },
      { label: "Film Prix", value: data?.filmPrix, icon: <DollarSign className="text-green-500" /> },
    ].map(({ label, value, icon }, index) => (
      <div key={index} className="grid grid-cols-4 py-3 items-center">
        {/* Colonne des labels */}
        <div className="flex items-center text-gray-700 text-left">
          {icon}
          <span className="ml-2 font-medium">{label}</span>
        </div>
        <div></div>
        {/* Colonne des valeurs (alignées à droite) */}
        <div className="text-gray-900 font-semibold text-right flex justify-start">
          {value || "n'est pas montioné"}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Page;
