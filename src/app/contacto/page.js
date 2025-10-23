
import ImagenHome from "../componentes/imagenHome";
import Formulario from "../componentes/formularioContacto";

export default function contactoHome() {
  return (
    <main>
      <ImagenHome imagenSrc="recursos/contacto.jpg" />
      <Formulario/>

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

