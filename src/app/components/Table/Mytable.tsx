"use client"; // Important pour que ce soit un Client Component
import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getUsers } from "@/app/lib/actions/user";

interface User {
  username: string;
  role: "admin" | "infographe" | "employe";
  createdAt: Date;
  updatedAt: Date;
}

const getRoleClass = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-green-100 text-green-600";
    case "infographe":
      return "bg-orange-100 text-orange-600";
    case "employe":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const UserTable = ({ search }: { search: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

  return (
    <div className="overflow-x-auto w-full mx-auto rounded-lg">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg text-sm">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Nom d'utilisateur</th>
            <th className="px-4 py-2 text-left">Rôle</th>
            <th className="px-4 py-2 text-left">Créé le</th>
            <th className="px-4 py-2 text-left">Mis à jour le</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index} className="border-t text-sm">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2">{user.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-2">{user.updatedAt.toLocaleDateString()}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Pencil size={16}/>
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Aucun utilisateur trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
