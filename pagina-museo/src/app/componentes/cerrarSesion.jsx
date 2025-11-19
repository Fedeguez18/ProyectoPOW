"use client";

import { useUsuario } from "../useUsuario";

export default function BotonCerrarSesion() {
  const { usuario, logueado, cerrarSesion } = useUsuario();

  return (
    <>
      {logueado ? (
        <button
          onClick={cerrarSesion}
          style={{
            padding: "10px 15px",
            background: "#e63946",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      ) : null}
    </>
  );
}
