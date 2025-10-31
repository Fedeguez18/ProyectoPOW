import { exhibicionesData } from "../../data/exhibicionesData";
import Image from "next/image";
import styles from "../../styles/detalleExhibicion.module.css";

// Función para encontrar el objeto por su ID (slug)
function getExhibicion(slug) {
  const item = exhibicionesData.find((ex) => ex.id === slug);
  return item;
}

// El componente de la página recibe `params` que contiene el `slug` de la URL
export default function PaginaDetalleExhibicion({ params }) {
  const { slug } = params;
  const item = getExhibicion(slug);

  // Fallback por si no se encuentra el item
  if (!item) {
    return (
      <main className={styles.detalleRoot}>
        <h1>Objeto no encontrado</h1>
        <p>No pudimos encontrar la exhibición que buscas.</p>
      </main>
    );
  }

  return (
    <main className={styles.detalleRoot}>
      <article className={styles.article}>
        <h1 className={styles.titulo}>{item.titulo}</h1>
        
        <div className={styles.imageWrapper}>
          <Image
            src={item.imagen}
            alt={item.titulo}
            width={1000}
            height={600}
            className={styles.mainImage}
            priority
          />
        </div>
        
        <div className={styles.content}>
          <p className={styles.descripcionCompleta}>
            {item.descripcionCompleta}
          </p>
          
          {/* Aquí podrías agregar más contenido, como galerías de imágenes, videos, etc. */}
        </div>
      </article>
    </main>
  );
}

