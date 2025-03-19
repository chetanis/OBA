import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface User {
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const users: User[] = [
  {
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 10:30 AM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "Yesterday, 3:45 PM",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "Aug 15, 2023",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Editor",
    status: "Pending",
    lastLogin: "Never",
  },
];

const UserTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Last Login</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t">
              <td className="px-6 py-3 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                {user.name}
              </td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-lg ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : user.status === "Inactive"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-3">{user.lastLogin}</td>
              <td className="px-6 py-3 flex justify-center gap-4">
                <button className="text-gray-500 hover:text-blue-600">
                  <Pencil size={18} />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
