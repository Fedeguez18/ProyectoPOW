/*"use client";

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../credenciales";

export const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {

  const [user, setUser] = useState(null);       // usuario firebase
  const [logueado, setLogueado] = useState(false);

  const [usuario, setUsuario] = useState({
    nombre: null,
    rol: null,
    premiun: null
  });

  // 🔥 Cuando cambia Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (userFirebase) => {
      setUser(userFirebase);
      setLogueado(!!userFirebase);
    });

    return () => unsub();
  }, []);

  // 🔥 Cargar datos desde PHP (solo si hay usuario)
  const cargarUsuario = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/user.php?uidd=${user.uidd}`
      );

      const data = await res.json();

      setUsuario({
        nombre: data.nombre,
        rol: data.rol,
        premiun: data.premiun
      });

    } catch (err) {
      console.error("Error cargando usuario:", err);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [user]);

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      setUsuario({
        nombre: null,
        rol: null,
        premiun: null
      });
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        user,
        logueado,
        usuario,       // ← aquí vienen: nombre, rol y premium
        cargarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
*/
"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "../../credenciales";
import { signOut, onAuthStateChanged } from "firebase/auth";

export const UsuarioContext = createContext();

export default function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [logueado, setLogueado] = useState(false);

  // Detecta si hay usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLogueado(!!user);
    });
    return () => unsub();
  }, []);

  // 🔥 Cerrar sesión (FUNCIONA)
  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setLogueado(false);
      setUsuario({
        nombre: null,
        rol: null,
        premiun: null
      });
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };


  return (
    <UsuarioContext.Provider value={{ usuario, logueado, cerrarSesion }}>
      {children}
      
    </UsuarioContext.Provider>
  );
}
