"use client"
import CreateProject from "@/app/components/Cpages/Projects/CreateProject";
import MainPageProject from "@/app/components/Cpages/Projects/MainPageProject";
import PathName from "@/app/components/PathName/PathName";
import { ProjectQueryParams } from "@/types/project";
import { useState } from "react";

const ClientPage = ({ params }: { params: ProjectQueryParams }) => {
    
    const [isCreating, setIsCreating] = useState(false);
    const paths = [
        { label: "Home", href: "/" },
        { label: "Projets", href: "/Travaux" },
        { label: "Liste des Projets" }
    ];
    
    return (
        // <ProtectedRouteAdmin>
        <div className="p-6">
            <PathName paths={paths} />
            {isCreating ? <CreateProject onCancel={() => setIsCreating(false)} /> : <MainPageProject params={params} onCreateProject={() => setIsCreating(true)} />}
        </div>
        // </ProtectedRouteAdmin>
    );
}

export default ClientPage