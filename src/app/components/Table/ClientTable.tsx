"use client"; // Important pour que ce soit un Client Component
import { getClients } from "@/app/lib/actions/client";
import { Client, Phone } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";



const ClientTable = ({ search }: { search: string }) => {
    const [clients, setClients] = useState<(Client & { telephone: Phone[] } & { _count: { projects: number } })[]>([]);
    const [filteredClients, setFilteredClietns] = useState<(Client & { telephone: Phone[] } & { _count: { projects: number } })[]>([]);

    useEffect(() => {
        const fetchClient = async () => {
            const data = await getClients();
            setClients(data);
            setFilteredClietns(data);
        };
        fetchClient();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredClietns(clients);
        } else {
            setFilteredClietns(
                clients.filter((client) =>
                    client.nom.toLowerCase().includes(search.toLowerCase())
                    || client.nomCommercial?.toLowerCase().includes(search.toLowerCase())
                    || client.telephone.some((phone) => phone.number.includes(search))
                )
            );
        }
    }, [search, clients]);

    return (
        <div className="overflow-x-auto w-full mx-auto rounded-lg">
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg text-sm">
                <thead className="bg-blue-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left">Nom </th>
                        <th className="px-4 py-2 text-left">Nom commercial</th>
                        <th className="px-4 py-2 text-left">Téléphone</th>
                        <th className="px-4 py-2 text-left">email</th>
                        <th className="px-4 py-2 text-left">Nb de Projets</th>
                        <th className="px-4 py-2 text-center">Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map((client, index) => (
                            <tr key={index} className="border-t text-sm">
                                <td className="px-4 py-2">{client.nom}</td>
                                <td className="px-4 py-2">{client.nomCommercial}</td>
                                <td className="px-4 py-2">{client.telephone[0]?.number}</td>
                                <td className="px-4 py-2">{client.email}</td>
                                <td className="px-4 py-2">{client._count.projects}</td>
                                <td className="px-4 py-2 flex justify-center gap-2">
                                    <button className="text-gray-500 hover:text-blue-600">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                Aucun client trouvé
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
