import Image from "next/image";
import styles from "../../styles/detalleExhibicion.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';

async function fetchExhibiciones() {
  try {
    const res = await fetch(`${API_BASE}/endpoints/listar_img.php`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Error fetching exhibiciones', e);
    return [];
  }
}

function getPublicUrl(item) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';
  let ruta = item.ruta || item.imagen || item.nombre_archivo || '';
  if (!ruta) return '';
  if (/^https?:\/\//i.test(ruta)) return ruta;
  if (ruta.startsWith('/')) {
    if (ruta.includes('/uploads/')) return ruta;
    return `${base}/${ruta.replace(/^\/+/, '')}`;
  }
  ruta = ruta.replace(/^(\.\.\/)+/, '');
  ruta = ruta.replace(/^\/+/, '');
  return `${base}/${ruta}`;
}

// El componente de la página recibe `params` que contiene el `slug` de la URL
export default async function PaginaDetalleExhibicion({ params }) {
  const { slug } = params;
  const all = await fetchExhibiciones();
  const item = all.find((ex) => ex.id === slug || ex.nombre_archivo === slug);

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

