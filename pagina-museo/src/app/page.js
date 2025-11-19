"use client";

import ImagenHome from "./componentes/imagenHome";
import MuseoTematicas from "./componentes/museoTematicas";
import Carrusel from "./componentes/carrusel";
import MapaUbicacion from "./componentes/mapaUbicacion";
import Link from "next/link";

// ⬅️ IMPORTA TU CONTEXTO
import { useUsuario } from "./useUsuario";

export default function Home() {

  // ⬅️ OBTENÉS EL ROL Y SI ESTÁ LOGUEADO
  const { usuario, logueado } = useUsuario();

  return (
    <main>
      <ImagenHome imagenSrc="recursos/home.jpg" titulo="Bienvenida" seccion="inicio"/>

      {/* 🔥 MOSTRAR BOTÓN SOLO SI ES ADMIN */}
      {logueado && usuario.rol === "admin" && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Link href="/admin">
            <button style={{ padding: "10px 18px", fontSize: 16 }}>
              Ir a Administración
            </button>
          </Link>
        </div>
      )}

      <MuseoTematicas />

      <div className="tituloSeccion">
        <h2>Colecciones Destacadas</h2>
        <Carrusel />
      </div>

      <MapaUbicacion />

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
