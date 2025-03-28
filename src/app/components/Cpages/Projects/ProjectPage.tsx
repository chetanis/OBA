import { Mybutton } from "@/app/components/Button/Mybutton";
import { Search } from "lucide-react";
import { useState } from "react";
import ProjectTable from "../../Table/ProjectTable";

const ProjectPage = ({ onCreateProject, projects }: { onCreateProject: () => void , projects:any}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="">

      <div className="p-4">
        {/* 📌 Ligne 1 : Titre et bouton alignés */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center rounded-lg mt-2 relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Bouton Créer projet */}
          <Mybutton text="Créer projet" onClick={onCreateProject} />
        </div>
      </div>

      {/* 📌 Table des projets */}
      <div className="mt-6">
        <ProjectTable search={search} data={projects}/>
      </div>
    </div>
  );
};

export default ProjectPage;
