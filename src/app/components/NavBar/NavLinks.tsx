"use client";

import clsx from 'clsx';
import {User,BriefcaseBusiness  } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";


const links = [
    { name: 'Client', href: '/Client', icon: User },
    
    { name: 'Travaux', href: '/Travaux', icon: BriefcaseBusiness   },
    

];

export default function NavLinks() {
    const pathname = usePathname();
    // set default to dashboard
    let linkColored =0;

    links.map((link,index) => {
        if (pathname.startsWith(link.href)) {
            linkColored =index;
        }
    });
    return (
        <>
            {links.map((link,index) => {

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-4 rounded-md bg-white p-3 text-sm font-medium hover:bg-blue-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                'text-white bg-blue-500 hover:bg-blue-300': index===linkColored,
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
