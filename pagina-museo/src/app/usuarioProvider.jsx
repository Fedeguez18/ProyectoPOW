"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../credenciales";
import { UsuarioContext } from "./usuarioContext";

export default function UsuarioProvider({ children }) {
  const [user, setUser] = useState(null);      // Usuario de Firebase
  const [logueado, setLogueado] = useState(false);

  const [usuario, setUsuario] = useState({
    nombre: null,
    premiun: false,
    rol: null,
  });

  // 🔹 Detectar login / logout en Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userFirebase) => {
      setUser(userFirebase);
      setLogueado(!!userFirebase);
    });

    return () => unsubs();
  }, []);

  // 🔹 Cargar datos de tu API PHP
  const cargarUsuario = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/user.php?uidd=${user.uid}`
      );
      const data = await res.json();

      setUsuario({
        nombre: data.nombre,
        premiun: data.premiun,
        rol: data.rol,
      });

    } catch (err) {
      console.error("Error cargando usuario:", err);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [user]);

  // 🔹 Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setLogueado(false);
      setUsuario({
        nombre: null,
        premiun: false,
        rol: null,
      });
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        user,
        usuario,        // nombre, premiun, rol
        logueado,
        cargarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
