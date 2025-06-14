import { BriefcaseBusiness, ShieldUser, Users, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MyLine from "../Myline/Myline";
import SideLink from "./SideLink";

const linksRessources = [
  { name: "Clients", href: "/Client", icon: Users },
  { name: "Utilisateurs", href: "/User", icon: ShieldUser },
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
        className={`w-64 bg-white sticky top-0  h-screen p-3 z-50 shadow-[10px_0_20px_rgba(0,0,0,0.1)] ${
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

        {/* Logo */}
        <div className="w-full flex justify-center items-center mb-5 mt-2">
          <Image src="/Google.png" width={100} height={100} alt="logo oba color" />
        </div>

        {/* Navigation */}
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
