import PathName from "@/app/components/PathName/PathName";
import { getClientById } from "@/app/lib/actions/client";
import React from "react";
import { Info } from "lucide-react";

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
      <h2 className="text-2xl font-bold text-blue-900">{data?.nom}</h2>

      {/* Titre Section */}
      <div className="bg-purple-50 rounded-lg w-fit mt-4 ml-7 flex items-center p-4 gap-4">
        <Info className="text-purple-800" />
        <h4 className="text-purple-950 pr-4">Informations du client</h4>
      </div>

      {/* Formulaire d'affichage des infos */}
      <div className="rounded-lg p-6 mt-6 w-full px-16">
        <div className="grid grid-cols-2 gap-4 gap-x-10">
          {[
            { label: "Nom", name: "nom", value: data?.nom },
            { label: "Nom Commercial", name: "nomCommercial", value: data?.nomCommercial },
            { label: "Email", name: "email", value: data?.email },
            { label: "Adresse", name: "adresse", value: data?.adresse },
            { label: "NRC", name: "nrc", value: data?.nrc },
            { label: "NIF", name: "nif", value: data?.nif },
            { label: "AI", name: "ai", value: data?.ai },
            { label: "NIS", name: "nis", value: data?.nis },
            { label: "Plaque Prix", name: "plaquePrix", value: data?.plaquePrix, type: "number" },
            { label: "Film Prix", name: "filmPrix", value: data?.filmPrix, type: "number" },
          ].map(({ label, name, value, type = "text" }) => (
            <div key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                step={type === "number" ? "0.01" : undefined}
                placeholder={label}
                className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full"
                defaultValue={value || ""}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
