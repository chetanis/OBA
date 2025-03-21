import { Mybutton } from "@/app/components/Button/Mybutton";
import PathName from "@/app/components/PathName/PathName";
import { Search } from "lucide-react";
import { useState } from "react";
import ClientTable from "../../Table/ClientTable";

const paths = [
  { label: "Home", href: "/" },
  { label: "Clients", href: "/Client" },
  { label: "Liste des Clients" }
];

const MainPageClient = ({ onCreateClient }: { onCreateClient: () => void }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <PathName paths={paths} />
      <h2 className="text-2xl font-bold  text-gray-800">Liste des Clients</h2>

      <div className="p-4">
        {/* 📌 Ligne 1 : Titre et bouton alignés */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center rounded-lg mt-2 relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Bouton Créer client */}
          <Mybutton text="Ajouter un client" onClick={onCreateClient} />
        </div>
      </div>

      {/* 📌 Table des Clients */}
      <div className="mt-1">
        <ClientTable search={search} />
      </div>
    </div>
  );
};

export default MainPageClient;
