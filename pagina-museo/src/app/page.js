import ImagenHome from "./componentes/imagenHome";
import MuseoTematicas from "./componentes/museoTematicas";
import Carrusel from "./componentes/carrusel";
import MapaUbicacion from "./componentes/mapaUbicacion";
import HorarioMuseo from "./componentes/HorarioMuseo"; // ← NUEVO

export default function Home() {
  return (
    <main>
      <ImagenHome titulo="Bienvenida" seccion="inicio" />
      <MuseoTematicas />

      <div className="tituloSeccion">
        <h2>Colecciones Destacadas</h2>
        <Carrusel />
      </div>

      <HorarioMuseo />

      <MapaUbicacion /> 

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}