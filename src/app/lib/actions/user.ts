"use server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { userSchema, updateUserSchema } from "@/types/user";


const prisma = new PrismaClient();

// **1️⃣ Fonction pour créer un utilisateur**
export async function createUser(formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

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
        role: data.role,
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

  const validatedData = updateUserSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: validatedData.error.errors };
  }

  try {
    let updateData: { password?: string; role?: string } = {};
    
    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }
    if (data.role) {
      updateData.role = data.role;
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

// **3️⃣ Fonction pour supprimer un utilisateur**
export async function deleteUser(formData: FormData) {
  const username = formData.get("username") as string;

  if (!username) return { error: "Nom d'utilisateur requis" };

  try {
    await prisma.user.delete({
      where: { username },
    });
    return { success: "Utilisateur supprimé avec succès" };
  } catch (error) {
    return { error: "Erreur lors de la suppression de l'utilisateur" };
  }
}

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

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}