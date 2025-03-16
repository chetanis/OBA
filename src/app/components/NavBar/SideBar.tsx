"use client"
import { BriefcaseBusiness, User } from "lucide-react"; // Assurez-vous d'installer lucide-react pour les icônes
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { name: "Client", href: "/Client", icon: User },
  { name: "Travaux", href: "/Travaux", icon: BriefcaseBusiness },
];



export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="w-56 bg-white h-screen ">
      <div className="p-4">
        <nav>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2  hover:bg-blue-200 rounded-lg transition-colors duration-200 ${
                    pathname === link.href ? "bg-blue-400 text-blue-700" : "text-gray-700"
                  }`}
                >
                  <link.icon className="w-5 h-5 mr-2" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}