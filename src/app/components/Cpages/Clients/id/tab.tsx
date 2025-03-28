'use client';

import React from "react";

interface TabsNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-6 border-b border-gray-300">
      {["all", "Employe de client", "Projet du client"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-sm font-semibold capitalize ${
            activeTab === tab
              ? "text-black border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          {tab === "all" ? "Informations personnelle de client" : tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNav;
