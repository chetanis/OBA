'use client';

import ClientInfo from "@/app/components/Cpages/Clients/id/informationsPersonelClient";
import { useState } from "react";
import EmployeList from "./SectionEmployeClients/EmployeList";
import { ProjectList } from "./SectionEmployeClients/ProjectList";
import TabsNav from "./tab";
// Import du composant TabsNav

export default function TabsComponent({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("Projets"); // Onglet actif par défaut

  return (
    <div>
      {/* Utilisation du composant TabsNav */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Affichage du contenu selon l'onglet actif */}
      <div className="mt-4">
        {activeTab === "all" && <ClientInfo data={data} />}
        {activeTab === "Employes" && <EmployeList data={data} />}
        {activeTab === "Projets" && <ProjectList  />}
        {/* Ajoute ici le composant pour "Projet du client" si nécessaire */}
      </div>
    </div>
  );
}
