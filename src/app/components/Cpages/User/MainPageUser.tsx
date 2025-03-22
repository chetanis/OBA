import { Mybutton } from "@/app/components/Button/Mybutton";
import PathName from "@/app/components/PathName/PathName";
import { Search } from "lucide-react";
import { useState } from "react";
import UserTable from "../../Table/UserTable";

const paths = [
  { label: "Home", href: "/" },
  { label: "Utilisateurs", href: "/User" },
  { label: "Liste des Utilisateurs" }
];

const MainPageUser = ({ onCreateUser }: { onCreateUser: () => void }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <PathName paths={paths} />
      <h2 className="text-2xl font-bold  text-blue-900">Liste des Utilisateurs</h2>

      <div className="p-4">
        {/* 📌 Ligne 1 : Titre et bouton alignés */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center rounded-lg mt-2 relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Bouton Créer utilisateur */}
          <Mybutton text="Créer utilisateur" onClick={onCreateUser} />
        </div>
      </div>

      {/* 📌 Table des utilisateurs */}
      <div className="mt-8">
        <UserTable search={search} />
      </div>
    </div>
  );
};

export default MainPageUser;
