"use client";

import clsx from "clsx";
import { User, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Client", href: "/Client", icon: User },
  { name: "Travaux", href: "/Travaux", icon: BriefcaseBusiness },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-4 rounded-md bg-white p-3 text-sm font-medium hover:bg-blue-400 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-blue-400 text-black": isActive, // Changement ici
              }
            )}
          >
            <link.icon size={20} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}