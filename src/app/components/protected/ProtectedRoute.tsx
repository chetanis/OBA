"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserFromToken } from "@/app/lib/actions/login";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserFromToken();

      if (!user && pathname !== "/login") {
        router.replace("/login"); // Redirige vers la page de connexion
      } else {
        setIsAuthenticated(!!user);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (loading) {
    return <div className="h-screen flex justify-center items-center text-lg">Chargement...</div>;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return <div className="h-screen flex justify-center items-center text-lg">Redirection...</div>;
  }

  return <>{children}</>;
}
