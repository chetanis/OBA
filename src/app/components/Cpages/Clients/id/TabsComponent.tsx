"use client"

import ClientInfo from "./informationsPersonelClient"
import { useState } from "react"
import EmployeList from "./SectionEmployeClients/EmployeList"
import { ProjectList } from "./SectionEmployeClients/ProjectList"
import TabsNav from "./tab"

export default function TabsComponent({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("Liste des projets") // Onglet actif par défaut

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Utilisation du composant TabsNav */}
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Affichage du contenu selon l'onglet actif */}
      <div className="p-6">
        {activeTab === "all" && <ClientInfo data1={data} />}
        {activeTab === "Employes" && <EmployeList data={data} />}
        {activeTab === "Liste des projets" && <ProjectList client={data} />}
      </div>
    </div>
  )
}
