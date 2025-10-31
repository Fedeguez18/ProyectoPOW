import  {exhibicionesData} from '../data/exhibicionesData';
import CartaEXhibiciones from '../componentes/cartaExhibicion';
import ImagenHome from '../componentes/imagenHome';
import styles from '../styles/museoTematicas.module.css';

export default function PaginaExhibicones() {
  return (
    <main>
      <ImagenHome imagenSrc="../recursos/banner-exhibiciones.jpg" titulo="Nuestras Exhibiciones" seccion = 'exhibiciones'/> 

      <section className={styles.museoTematicasRoot}>
        {/* Reutilizamos el estilo del título de tu otra sección */}
        <h2 className={styles.tituloSeccion}>Catálogo de Exhibiciones</h2>
        
        {/* Reutilizamos el contenedor de la grilla */}
        <div className={styles.gridContainer}>
          {exhibicionesData.map((item) => (
            <CartaEXhibiciones key={item.id} item={item} />
          ))}
        </div>
      </section>
      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

