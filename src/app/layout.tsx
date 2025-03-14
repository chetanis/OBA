import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./components/NavBar/SideBar";
import Header from "./components/NavBar/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-200`}>
        {/* Conteneur principal */}
        <div className="flex">
          <SideBar />
          <div className="flex flex-col w-full">
            {/* Header prend toute la largeur */}
            <Header />
            
            {/* Contenu principal */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}