'use client';

import React from "react";

interface TabsNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-6 border-b border-blue-700">
      {["Projets", "Employes", "all"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-sm font-semibold capitalize px-4 py-2 transition-all ${activeTab === tab
              ? "text-black border-t border-l border-r border-blue-700 rounded-t-lg bg-white -mb-[1px]"
              : "text-gray-400"
            }`}
        >
          {tab === "all" ? "Info" : tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNav;
