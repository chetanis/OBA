"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const SECRET_KEY = "votre_secret_key"; // Remplacez par une clé sécurisée


//fonction de login 
export async function authenticate(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Identifiants incorrects" };
  }

  // Génère un token JWT incluant le rôle
  const token = jwt.sign(
    { username: user.username, role: user.role }, // ⬅ Ajout du rôle ici
    SECRET_KEY,
    { expiresIn: "15m" }
  );

  // Génère un refresh token incluant le rôle
  const refreshToken = jwt.sign(
    { username: user.username, role: user.role }, // ⬅ Ajout du rôle ici
    SECRET_KEY,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();

  // Sauvegarde le token d'accès
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Sauvegarde le refresh token
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  });

  return { success: true };
}


//fonction vérifier est ce que le user est login avec le token est ce que il est valide ou non 
export async function getUserFromToken() {
  const cookieStore = await cookies();
  let token: string | undefined = cookieStore.get("token")?.value;

  if (!token) {
    return null; // Aucun token trouvé
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string; role: string };
    return decoded; // Retourne l'utilisateur avec son rôle
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      // Si le token a expiré, essayer d'obtenir un nouveau token avec refreshToken
      const refreshResponse = await refreshToken();
      if (refreshResponse.success) {
        token = cookieStore.get("token")?.value;
        if (token) {
          return jwt.verify(token, SECRET_KEY) as { username: string; role: string };
        }
      }
    }
    return null; // Token invalide ou non récupérable
  }
}


// refresh token 
export async function refreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return { error: "Refresh token manquant" };
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET_KEY) as jwt.JwtPayload;

    if (typeof decoded === "object" && "username" in decoded && "role" in decoded) {
      // Générer un nouveau token d'accès avec le rôle
      const newAccessToken = jwt.sign(
        { username: decoded.username, role: decoded.role }, // ⬅ Ajout du rôle ici
        SECRET_KEY,
        { expiresIn: "15m" }
      );

      // Mettre à jour le cookie du token d'accès
      cookieStore.set("token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return { success: true, token: newAccessToken };
    }

    return { error: "Format du token invalide" };
  } catch (error) {
    return { error: "Refresh token invalide ou expiré" };
  }
}



// fonction pour le logout
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token"); // Supprime le token JWT
  cookieStore.delete("refreshToken"); // Supprime également le refresh token
}
