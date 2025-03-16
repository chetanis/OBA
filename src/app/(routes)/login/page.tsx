"use client";
import { useState } from "react";
import { authenticate } from "../../lib/actions/login";
import { useRouter } from "next/navigation"; // Utilisez useRouter pour la redirection

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialise useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Appel de la fonction d'authentification côté serveur
    const result = await authenticate(username, password);

    if (result?.error) {
      setError(result.error); // Affiche l'erreur si l'authentification échoue
    } else {
      // Redirige vers /dashboard après une connexion réussie
      router.push("/Client");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Connexion</h2>
        {error && (
          <p className="p-2 text-center text-red-600 bg-red-100 rounded-lg">
            {error}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r bg-blue-500 text-white rounded-md"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}