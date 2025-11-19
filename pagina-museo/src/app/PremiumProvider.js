/*"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../credenciales";
import { UsuarioContext } from "./usuarioContext";

export default function PremiumProvider({ children }) {
  const [usuario, setUsuario] = useState({
    nombre: null,
    premiun: false,
    rol: null,
  });

  const [user, setUser] = useState(null);  
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLogueado(!!user);
    });

    return unsubscribe;
  }, []);

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

    } catch (e) {
      console.log("Usuario no logueado");
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [user]);

  return (
    <UsuarioContext.Provider value={{ usuario, cargarUsuario, logueado }}>
      {children}
    </UsuarioContext.Provider>
  );
}*/
