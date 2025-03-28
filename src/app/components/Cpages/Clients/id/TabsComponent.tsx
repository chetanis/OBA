'use client';

import { useState } from "react";
import ClientInfo from "@/app/components/Cpages/Clients/id/informationsPersonelClient";
import TabsNav from "./tab";
import EmployeList from "./SectionEmployeClients/EmployeList";
import { ProjectList } from "./SectionEmployeClients/ProjectList";
// Import du composant TabsNav

export default function TabsComponent({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div>
      {/* Utilisation du composant TabsNav */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Affichage du contenu selon l'onglet actif */}
      <div className="mt-4">
        {activeTab === "all" && <ClientInfo data={data} />}
        {activeTab === "Employe de client" && <EmployeList data={data} />}
        {activeTab === "Projet du client" && <ProjectList  />}
        {/* Ajoute ici le composant pour "Projet du client" si nécessaire */}
      </div>
    </div>
  );
}
