import React, { useState } from "react";
import { Pencil } from "lucide-react";
import DeleteEmployeButton from "../Cpages/Clients/id/SectionEmployeClients/DeleteEmployeClient";
import { deleteEmploye } from "@/app/lib/actions/client";
 // Assurez-vous que le chemin est correct

const EmployeTable = ({ data }: { data: any }) => {
  // ✅ État local pour stocker les employés
  const [employes, setEmployes] = useState(data?.employes || []);

  // ✅ Fonction pour supprimer un employé
  const handleDeleteEmploye = async (id: number) => {
    const response = await deleteEmploye(id); // Appel à la fonction de suppression

    if (response.success) {
      setEmployes((prevEmployes: any) => prevEmployes.filter((emp: any) => emp.id !== id));
    } else {
      console.error("Erreur lors de la suppression :", response.error);
    }
  };

  return (
    <div className="overflow-x-auto w-full mx-auto rounded-lg">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg text-sm">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Fonction</th>
            <th className="px-4 py-2 text-left">Téléphone</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employes.length > 0 ? (
            employes.map((employe: any, index: number) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-4 py-2">{employe.nom}</td>
                <td className="px-4 py-2">{employe.fonction}</td>
                <td className="px-4 py-2">
                  {employe.telephone && employe.telephone.length > 0
                    ? employe.telephone[0].number
                    : "N/A"}
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Pencil size={16} />
                  </button>
                  <DeleteEmployeButton username={employe.nom} onDelete={() => handleDeleteEmploye(employe.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Aucun employé trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeTable;
