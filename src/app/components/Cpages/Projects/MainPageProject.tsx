import { getAllProjects } from "@/app/lib/actions/project";
import { ProjectQueryParams } from "@/types/project";
import { Project } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";



const MainPageProject = ({ onCreateProject, params }: { onCreateProject: () => void, params: ProjectQueryParams }) => {
  const [projects, setProjects] = useState<(Project & { client: { nom: string } | null })[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();


  useEffect(() => {
    const fetchProjects = async () => {
      const { projects, total } = await getAllProjects(params.page, params.pageSize, {
        search: params.search || "",
        startDate: params.startDate,
        endDate: params.endDate,
        status: params.status,
        type: params.type,
      }
      );
      setProjects(projects || []);
      setTotal(total || 0);
    };
    fetchProjects();
  }, [params]);



  const handleRowClick = (id: number) => {
    router.push(`/projet/${id}`);
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case "TERMINE":
        return "bg-green-100 text-green-600";
      case "EN_ATTENTE":
        return "bg-orange-100 text-orange-600";
      case "ANNULER":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-blue-900">Liste des Projets</h2>

      <SearchBar onCreateProject={onCreateProject}/>

      {/* 📌 Table des Projets */}
      <div className="mt-6">
        <div className="overflow-x-auto w-full mx-auto rounded-lg">
          <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Dimension</th>
                <th className="px-4 py-2 text-left">Nb</th>
                <th className="px-4 py-2 text-left">Etat</th>
                <th className="px-4 py-2 text-left">Créé le</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr key={index} className="border-t text-sm">
                    <td className="px-4 py-2">{project.nom}</td>
                    <td className="px-4 py-2">{project.client?.nom}</td>
                    <td className="px-4 py-2">{project.type}</td>
                    <td className="px-4 py-2">
                      {project.typePlaque ?? `${project.dimension_x} x ${project.dimension_y}`}
                    </td>
                    <td className="px-4 py-2">{project.nbPlaque_Film}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getRoleClass(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{project.createdAt.toDateString()}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button className="text-gray-500 hover:text-blue-600">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Aucun projet trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainPageProject;
