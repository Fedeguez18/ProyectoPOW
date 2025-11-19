import Image from "next/image";
import Link from "next/link";
import ComentarioForm from "../../componentes/ComentarioForm";
import ComentariosList from "../../componentes/ComentariosList";
import { getImageUrl } from '../../utils/config';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/App/ProyectoPOW/API_Proyecto';

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

// Genera las rutas estáticas para todas las exhibiciones
export async function generateStaticParams() {
  const exhibiciones = await fetchExhibiciones();
  
  return exhibiciones.map((item) => ({
    slug: String(item.id),
  }));
}

// El componente de la página recibe `params` que contiene el `slug` de la URL
export default async function PaginaDetalleExhibicion({ params }) {
  const { slug } =  await params;
  const all = await fetchExhibiciones();
  
  // Buscar por ID (convertido a string para comparar)
  const item = all.find((ex) => String(ex.id) === slug);

  // Fallback por si no se encuentra el item
  if (!item) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Exhibición no encontrada</h1>
        <p>No pudimos encontrar la exhibición que buscas.</p>
        <Link href="/exhibiciones" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          ← Volver a Exhibiciones
        </Link>
      </main>
    );
  }

  // Construir URL de imagen usando la función helper
  const imageUrl = getImageUrl(item.ruta || item.imagen);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Link href="/exhibiciones" style={{ display: 'inline-block', marginBottom: '1rem', color: '#0070f3' }}>
        ← Volver a Exhibiciones
      </Link>
      
      <article>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.titulo}</h1>
        
        {item.categoria && (
          <span style={{ 
            display: 'inline-block', 
            padding: '0.25rem 0.75rem', 
            background: '#e5e7eb', 
            borderRadius: '4px',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            {item.categoria}
          </span>
        )}
        
        <div style={{ position: 'relative', width: '100%', height: '500px', marginBottom: '2rem' }}>
          <Image
            src={imageUrl}
            alt={item.titulo}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            unoptimized={true}
          />
        </div>
        
        <div style={{ lineHeight: '1.8' }}>
          {item.descripcion && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Descripción</h2>
              <p>{item.descripcion}</p>
            </div>
          )}
          
          {item.autor && (
            <div style={{ marginBottom: '1rem' }}>
              <strong>Autor/Coleccionista:</strong> {item.autor}
            </div>
          )}
          
          {item.fecha && (
            <div style={{ marginBottom: '1rem' }}>
              <strong>Fecha:</strong> {item.fecha}
            </div>
          )}
          
          {item.palabras_clave && (
            <div style={{ marginTop: '2rem' }}>
              <strong>Palabras clave:</strong>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {item.palabras_clave.split(',').map((palabra, idx) => (
                  <span 
                    key={idx}
                    style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: '#f3f4f6', 
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}
                  >
                    {palabra.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/*<ComentarioForm imagenId={item.id} user={usuarioActual} />*/}
        <ComentariosList imagenId={item.id} />
      </article>

      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}