"use client"; // Pour utiliser useState
import React, { useState } from "react";
import { Mybutton } from "@/app/components/Button/Mybutton";
import PathName from "@/app/components/PathName/PathName";
import { Search } from "lucide-react";
import UserTable from "../../Table/Mytable";

const paths = [
  { label: "Home", href: "/" },
  { label: "Utilisateurs", href: "/User" },
  { label: "Liste des Utilisateurs" }
];

const MainPageUser = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <PathName paths={paths} />

      {/* Ligne séparatrice */}
      <div className="flex-grow border-t border-black mt-3 mx-4"></div>

      <h2 className="text-2xl font-bold mt-6 text-gray-800">Liste des Utilisateurs</h2>

      <div className="p-4">
        {/* 📌 Ligne 1 : Titre et bouton alignés */}
        <div className="flex justify-between items-center mb-1">
          <h4 className="">Rechercher un utilisateur</h4>
          <Mybutton text="Créer utilisateur" />
        </div>

        {/* 📌 Ligne 2 : Barre de recherche */}
        <div className="flex justify-start items-center rounded-lg mt-2 relative w-full max-w-md">
          {/* Icône de recherche */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />

          {/* Input de recherche */}
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
          />
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
