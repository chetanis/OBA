import { ChevronDown, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken, logout } from "@/app/lib/actions/login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SideBar from "./SideBar"; // Importer SideBar

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar mobile

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserFromToken();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* Sidebar mobile */}
      {isSidebarOpen && <SideBar isMobile={true} closeSidebar={() => setIsSidebarOpen(false)} />}

      <div className="bg-white py-1 px-3 sm:px-2 flex justify-between items-center gap-3 shadow-md">
        {/* Bouton pour ouvrir la sidebar sur mobile */}
        <div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-3 px-6">
          <div className="flex justify-center items-center gap-3">
            <Image src="/user.png" width={33} height={33} alt="user" />
            <div>
              <div className="text-base">{user?.username}</div>
              <div className="text-xs">{user?.role}</div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 hover:bg-gray-100 rounded-full transition-all cursor-pointer flex justify-center items-center">
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Paramètre</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
