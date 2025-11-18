import CartaEXhibiciones from '../componentes/cartaExhibicion';
import ImagenHome from '../componentes/imagenHome';
import styles from '../styles/museoTematicas.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';

async function fetchExhibiciones() {
  try {
    const res = await fetch(`${API_BASE}/endpoints/listar_img.php`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (e) {
    return [];
  }
}

function getPublicUrl(item) {
  const ruta = item?.ruta || item?.nombre_archivo || item?.imagen;
  if (!ruta) return '';
  if (ruta.startsWith('http') || ruta.startsWith('/')) return ruta.startsWith('/') ? ruta : ruta;
  // normalize common stored forms like "uploads/xxx" or "../uploads/xxx"
  return ruta.replace(/^\.\//, '/').replace(/^uploads\//, '/API_Proyecto/uploads/').replace(/^\.\.\/uploads\//, '/API_Proyecto/uploads/');
}

export default async function PaginaExhibicones() {
  const exhibiciones = await fetchExhibiciones();

  return (
    <main>
      <ImagenHome imagenSrc="/recursos/banner-exhibiciones.jpg" titulo="Nuestras Exhibiciones" seccion={'exhibiciones'} />

      <section className={styles.museoTematicasRoot}>
        <h2 className={styles.tituloSeccion}>Catálogo de Exhibiciones</h2>

        <div className={styles.gridContainer}>
          {exhibiciones.map((item) => (
            <CartaEXhibiciones key={item.id || item.nombre_archivo} item={{ ...item, imagen: getPublicUrl(item) }} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

