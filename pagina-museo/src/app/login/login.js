"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../credenciales";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Obtener rol desde tu servidor PHP
      const res = await fetch(
        `http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/user.php?uidd=${user.uid}`
      );
      const data = await res.json();

      // 3️⃣ Redirigir según el rol REAL
      if (data.rol === "admin") {
        router.push("../admin");
      } else {
        router.push("/");
      }

    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-center text-3xl font-bold mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-[#2F5D50] text-white py-3 rounded-lg font-semibold hover:bg-[#23493F]"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
