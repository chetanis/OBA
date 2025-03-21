"use client";
import { useState } from "react";
import MainPageUser from "@/app/components/Cpages/User/MainPageUser";
import CreateUserPage from "@/app/components/Cpages/User/CreateUser";
const paths = [
  { label: "Home", href: "/" },
  { label: "Utilisateurs", href: "/User" },
  { label: "Liste des Utilisateurs",href:"/" }
];

const User = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      {isCreating ? <CreateUserPage /> : <MainPageUser onCreateUser={() => setIsCreating(true)} />}
    </>
  );
};

export default User;
