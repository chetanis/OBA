import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/types/user"; // Assure-toi que l'import est correct
import MyInput from "@/app/components/Input/MyInput"; // Assure-toi que le chemin est correct
import PathName from "../../PathName/PathName";
import { createUser } from "@/app/lib/actions/user";
import { Role } from "@prisma/client";
type UserFormData = {
  username: string;
  password: string;
  role: Role;
};

const CreateUserPage = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "employe",
    },
  });

  // États pour gérer les messages de succès et d'erreur
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000); // Disparaît après 5 secondes

      return () => clearTimeout(timer); // Nettoie le timeout si le composant est démonté ou si un nouveau message apparaît
    }
  }, [successMessage, errorMessage]);

  const paths = [
    { label: "Home", href: "/" },
    { label: "Utilisateurs", href: "/User" },
    { label: "Liste des Utilisateurs", href: "/User" },
    { label: "Créer un Utilisateur" },
  ];

  const onSubmit = async (data: UserFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const result = await createUser(data);

      if (result.success) {
        setSuccessMessage("Utilisateur créé avec succès !");
        form.reset();
      } else {
        setErrorMessage("Une erreur s'est produite lors de la création de l'utilisateur.");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      if (Array.isArray(error)) {
        setErrorMessage(error.map((err) => err.message).join(", "));
      } else if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <div className="p-6">
      <PathName paths={paths} />
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Créer un Utilisateur</h2>
      <h4 className="pl-4 mt-8">Informations de l'utilisateur</h4>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 px-11">
        <MyInput label="Nom d'utilisateur" name="username" placeholder="Nom d'utilisateur" form={form} />
        <MyInput label="Mot de passe" name="password" type="password" placeholder="Mot de passe" form={form} />

        <div>
          <label className="block text-gray-700">Rôle</label>
          <select {...form.register("role")} className="p-2 border rounded-lg w-full bg-gray-100 border-blue-200">
            <option value="admin">Admin</option>
            <option value="infographe">Infographe</option>
            <option value="employe">Employé</option>
          </select>
          {form.formState.errors.role && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.role.message}</p>
          )}
        </div>

        {successMessage && (
          <div className="p-3 mb-4 text-green-800 bg-green-200 border border-green-400 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 mb-4 text-red-800 bg-red-200 border border-red-400 rounded-lg">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Créer Utilisateur
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;
