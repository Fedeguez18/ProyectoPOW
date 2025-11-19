import ImagenHome from "../componentes/imagenHome";
import Museo from "../componentes/museo";

export default function MuseoHome() {
  return (
    <main>
      <ImagenHome titulo="Nuestro Museo" seccion="museo" />
      <Museo />
      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}