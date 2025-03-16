"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserFromToken } from "@/app/lib/actions/login";

export default function ProtectedRouteAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserFromToken();
      console.log('user est :'+ user?.username);
      if (!user) {
        router.replace("/login"); // 🔹 Redirection si non connecté
      } else if (user.role !== "admin") {
        router.replace("/");
        // 🔹 Redirection vers la page précédente si pas admin
      } else {
        setIsAuthorized(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (loading) {
    return <div className="h-screen flex justify-center items-center text-lg">Chargement...</div>;
  }

  if (!isAuthorized) {
    return <div className="h-screen flex justify-center items-center text-lg">Redirection...</div>;
  }

  return <>{children}</>;
}
