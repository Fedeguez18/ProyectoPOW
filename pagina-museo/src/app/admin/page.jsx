// src/app/admin/page.jsx
"use client";

import { useUsuario } from "../useUsuario";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Gestion from "./gestion";

export default function AdminPage() {
  const { usuario, logueado } = useUsuario();
  const router = useRouter();

  useEffect(() => {
    if (!logueado) {
      router.push("/login");
    } else if (usuario.rol !== "admin") {
      router.push("/"); // NO ES admin → afuera
    }
  }, [usuario, logueado]);
  return <Gestion />;
}
//Con esto, la URL /admin mostrará el contenido de gestion.jsx.


