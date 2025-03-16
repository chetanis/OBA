"use client"; // Ajoute cette ligne si tu es dans un composant client

import React from "react";
import { useRouter } from "next/navigation"; // Importer le router
import { UserCircle } from "lucide-react"; 
import { logout } from "@/app/lib/actions/login";

const Header = () => {
  const router = useRouter(); // Initialiser le router

  const handleLogout = async () => {
    await logout(); // Exécuter la fonction logout
    router.push("/login"); // Rediriger vers la page de connexion
  };

  return (
    <div className="bg-white p-4 flex justify-end items-center">
      {/* Icône User à droite */}
      <UserCircle className="w-6 h-6 text-gray-600 cursor-pointer" onClick={handleLogout} />
    </div>
  );
};

export default Header;
