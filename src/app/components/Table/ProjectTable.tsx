"use client";
import { Project, Tache } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectWithTaches extends Project {
    taches: Tache[];
}

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

const ProjectTable = ({ search, data }: { search: string; data: ProjectWithTaches[] }) => {
    const [projects, setProjects] = useState<ProjectWithTaches[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectWithTaches[]>([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    useEffect(() => {
        setProjects(data);
        setFilteredProjects(data);
    }, [data]);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter((project) =>
                    project.nom.toLowerCase().includes(search.toLowerCase())
                )
            );
            setCurrentPage(1); // Reset to first page when searching
        }
    }, [search, projects]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto w-full mx-auto rounded-lg">
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg text-sm">
                <thead className="bg-blue-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left">Nom</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Dimension</th>
                        <th className="px-4 py-2 text-left">Nb</th>
                        <th className="px-4 py-2 text-left">Etat</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProjects.length > 0 ? (
                        paginatedProjects.map((project, index) => (
                            <tr key={index} className="border-t text-sm">
                                <td className="px-4 py-2">{project.nom}</td>
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <span className="text-sm">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectTable;
