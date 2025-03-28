import TabsComponent from "@/app/components/Cpages/Clients/id/TabsComponent";
import PathName from "@/app/components/PathName/PathName";
import { getClientById } from "@/app/lib/actions/client";
 // Composant client
import React, { useState } from "react";

const Page = async ({ params }: { params: any }) => {
  const data = await getClientById(params.id);
  
  const paths = [
    { label: "Home", href: "/" },
    { label: "Clients", href: "/Client" },
    { label: "Liste des Clients", href: "/Client" },
    { label: String(data?.nom) },
  ];

  return (
    <div className="p-6">
      <PathName paths={paths} />
      
      {/* Passer les données au composant client */}
      <TabsComponent data={data} />
    </div>
  );
};

export default Page;
