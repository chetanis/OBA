"use server";

import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { userSchema, updateUserSchema } from "@/types/user";

const prisma = new PrismaClient();
type UserFormData = {
  username: string;
  password: string;
  role: Role;
};
// **1️⃣ Fonction pour créer un utilisateur**
export async function createUser(data: UserFormData) {
  // ✅ Vérification : s'assurer que le rôle est valide
  if (!Object.values(Role).includes(data.role as Role)) {
    return { error: "Rôle invalide" };
  }

  const validatedData = userSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: validatedData.error.errors };
  }

  try {
    const hashedPassword = await hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role as Role,
      },
    });
    return { success: "Utilisateur créé avec succès", user };
  } catch (error) {
    return { error: "Erreur lors de la création de l'utilisateur" };
  }
}

// **2️⃣ Fonction pour mettre à jour un utilisateur**
export async function updateUser(formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string | null,
    role: formData.get("role") as string | null,
  };

  // ✅ Vérification : s'assurer que le rôle est valide si fourni
  if (data.role && !Object.values(Role).includes(data.role as Role)) {
    return { error: "Rôle invalide" };
  }

  const validatedData = updateUserSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: validatedData.error.errors };
  }

  try {
    let updateData: { password?: string; role?: Role } = {};

    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }
    if (data.role) {
      updateData.role = data.role as Role; // ✅ Correction ici
    }

    const updatedUser = await prisma.user.update({
      where: { username: data.username },
      data: updateData,
    });

    return { success: "Utilisateur mis à jour", updatedUser };
  } catch (error) {
    return { error: "Erreur lors de la mise à jour de l'utilisateur" };
  }
}

export async function deleteUser(username: string) {
  if (!username) return { error: "Nom d'utilisateur requis" };
  if(username =='admin') return{error : "vous pouvez supprimer utilisateur admin"}
  try {
    await prisma.user.delete({
      where: { username },
    });
    return { success: "Utilisateur supprimé avec succès" };
  } catch (error) {
    return { error: "Erreur lors de la suppression de l'utilisateur" };
  }
}



// **4️⃣ Fonction pour récupérer les utilisateurs**
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // ✅ Correction : Assurer que `role` est bien typé comme `Role`
    return users.map(user => ({
      ...user,
      role: user.role as Role, // ✅ Correction ici
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
