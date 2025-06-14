"use client"; // Marquer ce composant comme un composant client

import { usePathname } from 'next/navigation';
import Header from "./components/NavBar/Header";
import SideBar from "./components/NavBar/SideBar";
import ProtectedRoute from './components/protected/ProtectedRoute';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtenir l'URL actuelle

  // Vérifier si l'URL est `/page`
  const isPageRoute = pathname === '/login';

  return (
    <>
    <ProtectedRoute>
      {/* Masquer SideBar si l'URL est `/page` */}
      {!isPageRoute && <SideBar />}

      <div className="flex flex-col w-full">
        {/* Masquer Header si l'URL est `/page` */}
        {!isPageRoute && <Header />}

        {/* Contenu principal */}
        <div>{children}</div>
      </div>
      </ProtectedRoute>
    </>
  );
}