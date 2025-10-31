import ImagenHome from "./componentes/imagenHome";
import MuseoTematicas from "./componentes/museoTematicas";
import Carrusel from "./componentes/carrusel";
import MapaUbicacion from "./componentes/mapaUbicacion";

export default function Home() {
  return (
    <main>
      <ImagenHome imagenSrc="recursos/home.jpg" titulo="Bienvenida" seccion="inicio"/>
      <MuseoTematicas />

      <div className = "tituloSeccion">
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