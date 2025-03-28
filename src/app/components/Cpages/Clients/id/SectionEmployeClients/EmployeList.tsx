import EmployeTable from "@/app/components/Table/EmployeTable";
import React, { useState } from "react";
import AjouterEmployeClient from "./AjouterEmployeClient";

const EmployeList = ({ data }: { data: any }) => {
  console.log(data);

  // État pour stocker les employés
  const [mydata, setClient] = useState(data);

  // Fonction pour ajouter un employé
  const handleEmployeAdded = (newEmploye: any) => {
    setClient((prevData: any) => ({
      ...prevData,
      employes: [...(prevData.employes || []), newEmploye], // Ajoute le nouvel employé à la liste existante
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 my-8">
        Liste des employés du client
      </h2>

      {mydata?.employes?.length > 0 ? (
        <EmployeTable data={mydata} />
      ) : (
        <p>Aucun employé disponible</p>
      )}

      <AjouterEmployeClient clientId={mydata.id} onEmployeAdded={handleEmployeAdded} />
    </div>
  );
  
};

export default EmployeList;
