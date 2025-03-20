"use client"
import Link from "next/link";
import React from 'react'


interface LinkItem {
    name: string;
    href: string;
    icon: React.ElementType;
  }
  
  interface Mydata {
    liste: LinkItem[];
    pathname: string;
  }
  
  const SideLink = ({ liste, pathname }: Mydata) => {
    return (
      <ul className="space-y-2">
        {liste.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`flex items-center p-2 hover:bg-blue-100 rounded-md transition-colors duration-200 text-sm ${
                pathname === link.href ? "bg-blue-200 text-blue-900" : "text-blue-700"
              }`}
            >
              <link.icon className="w-5 h-5 mr-2" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  
  export default SideLink;
  