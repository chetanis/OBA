import React from "react";
import { UserCircle } from "lucide-react"; // Import de l'icône

const Header = () => {
  return (
    <div className="bg-white  p-4 flex justify-end items-center">
      
      
      {/* Icône User à droite */}
      <UserCircle className="w-6 h-6 text-gray-600 cursor-pointer" />
    </div>
  );
};

export default Header;
