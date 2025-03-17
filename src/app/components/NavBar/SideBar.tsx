import { BriefcaseBusiness, Users, ShieldUser, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MyLine from "../Myline/Myline";
import SideLink from "./SideLink";

const linksRessources = [
  { name: "Clients", href: "/Client", icon: Users },
  { name: "Utilisateurs", href: "/Utilisateurs", icon: ShieldUser },
];

const linksTravaux = [{ name: "Projets", href: "/Travaux", icon: BriefcaseBusiness }];

interface SideBarProps {
  isMobile?: boolean;
  closeSidebar?: () => void;
}

export default function SideBar({ isMobile = false, closeSidebar }: SideBarProps) {
  const pathname = usePathname();

  return (
    <>
      {isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar} // Fermer en cliquant en dehors
        />
      )}

      <div
        className={`w-64 bg-white h-screen p-2 shadow-md z-50 ${
          isMobile
            ? "fixed top-0 left-0 transition-transform transform translate-x-0"
            : "hidden lg:block"
        }`}
      >
        {isMobile && (
          <button onClick={closeSidebar} className="absolute top-2 right-2 p-2 rounded-md hover:bg-gray-200">
            <X className="w-6 h-6" />
          </button>
        )}

       
        <div className="w-full flex justify-center items-center mb-5 mt-2">
          <Image src="/Google.png" width={100} height={100} alt="logo oba color" />
        </div>

        <nav className="overflow-y-auto max-h-[calc(100vh-150px)]">
          <MyLine name={"Ressources"} />
          <SideLink liste={linksRessources} pathname={pathname} />

          <MyLine name={"Travaux"} />
          <SideLink liste={linksTravaux} pathname={pathname} />
        </nav>
      </div>
    </>
  );
}
