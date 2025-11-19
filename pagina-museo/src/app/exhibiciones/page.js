'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import CartaExhibiciones from '../componentes/cartaExhibicion';
import ImagenHome from '../componentes/imagenHome';
import FiltroExhibiciones from '../componentes/FiltroExhibiciones';
import styles from '../styles/museoTematicas.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/ProyectoPOW/API_Proyecto';

export default function PaginaExhibiciones() {
  const searchParams = useSearchParams();
  const categoriaURL = searchParams.get('categoria');

  const [exhibicionesOriginales, setExhibicionesOriginales] = useState([]);
  const [exhibicionesFiltradas, setExhibicionesFiltradas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidadMostrada, setCantidadMostrada] = useState(20);
  const [categoriaInicial, setCategoriaInicial] = useState('Todas');
  const cantidadPorCarga = 20;

  useEffect(() => {
    fetchExhibiciones();
  }, []);

  useEffect(() => {
    if (categoriaURL) {
      setCategoriaInicial(categoriaURL);
    }
  }, [categoriaURL]);

  const fetchExhibiciones = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/endpoints/listar_img.php`, { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!res.ok) {
        console.error('Error fetching exhibiciones:', res.status);
        return;
      }
      
      const json = await res.json();
      
      // ⚡ FILTRAR: Excluir imágenes con categoría "banner-*"
      const exhibiciones = Array.isArray(json) 
        ? json.filter(item => {
            const cat = item.categoria || '';
            return !cat.toLowerCase().startsWith('banner-');
          })
        : [];
      
      setExhibicionesOriginales(exhibiciones);
      
      // Extraer categorías únicas (ya filtradas)
      const categoriasUnicas = [...new Set(
        exhibiciones
          .map(item => item.categoria)
          .filter(Boolean)
      )];
      setCategorias(categoriasUnicas);
      
      // Si hay categoría en URL, filtrar automáticamente
      if (categoriaURL) {
        const filtrados = exhibiciones.filter(item => item.categoria === categoriaURL);
        setExhibicionesFiltradas(filtrados);
      } else {
        setExhibicionesFiltradas(exhibiciones);
      }
      
    } catch (e) {
      console.error('Error en fetchExhibiciones:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltrar = useCallback(({ busqueda, categoria, orden }) => {
    let resultados = [...exhibicionesOriginales];

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase();
      resultados = resultados.filter(item => {
        const titulo = (item.titulo || '').toLowerCase();
        const descripcion = (item.descripcion || '').toLowerCase();
        const palabrasClave = (item.palabras_clave || '').toLowerCase();
        
        return titulo.includes(busquedaLower) || 
               descripcion.includes(busquedaLower) || 
               palabrasClave.includes(busquedaLower);
      });
    }

    // Filtrar por categoría
    if (categoria && categoria !== 'Todas') {
      resultados = resultados.filter(item => item.categoria === categoria);
    }

    // Ordenar
    switch (orden) {
      case 'A-Z':
        resultados.sort((a, b) => (a.titulo || '').localeCompare(b.titulo || ''));
        break;
      case 'Z-A':
        resultados.sort((a, b) => (b.titulo || '').localeCompare(a.titulo || ''));
        break;
      case 'Recientes':
        resultados.sort((a, b) => new Date(b.fecha_subida || 0) - new Date(a.fecha_subida || 0));
        break;
      case 'Antiguos':
        resultados.sort((a, b) => new Date(a.fecha_subida || 0) - new Date(b.fecha_subida || 0));
        break;
    }

    setExhibicionesFiltradas(resultados);
    setCantidadMostrada(cantidadPorCarga);
  }, [exhibicionesOriginales]);

  const cargarMas = () => {
    setCantidadMostrada(prev => prev + cantidadPorCarga);
  };

  const exhibicionesAMostrar = exhibicionesFiltradas.slice(0, cantidadMostrada);
  const hayMas = cantidadMostrada < exhibicionesFiltradas.length;

  if (loading) {
    return (
      <main>
        <ImagenHome titulo="Nuestras Exhibiciones" seccion="exhibiciones" />
        <section className={styles.museoTematicasRoot}>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Cargando exhibiciones...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <ImagenHome titulo="Nuestras Exhibiciones" seccion="exhibiciones" />

      <section className={styles.museoTematicasRoot}>
        <h2 className={styles.tituloSeccion}>Catálogo de Exhibiciones</h2>

        {categoriaURL && (
          <div style={{ 
            background: '#eff6ff', 
            padding: '1rem',
            borderRadius: '8px', 
            marginTop: '0.75rem', // separación añadida respecto al título
            marginBottom: '1rem',
            border: '2px solid #5f8f43b0'
          }}>
            <p style={{ margin: 0 }}>
              Mostrando exhibiciones de: <strong>{categoriaURL}</strong>
            </p>
          </div>
        )}

        <FiltroExhibiciones 
          onFiltrar={handleFiltrar}
          categorias={categorias}
          categoriaInicial={categoriaInicial}
        />

        <div style={{ marginBottom: '1rem', color: '#c2b9acff' }}>
          Mostrando {exhibicionesAMostrar.length} de {exhibicionesFiltradas.length} exhibiciones
        </div>

        {exhibicionesAMostrar.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>No se encontraron exhibiciones con los filtros seleccionados.</p>
          </div>
        ) : (
          <>
            <div className={styles.gridContainer}>
              {exhibicionesAMostrar.map((item) => (
                <CartaExhibiciones 
                  key={item.id} 
                  item={item} 
                />
              ))}
            </div>

            {hayMas && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={cargarMas}
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#5f8f43ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#2563eb'}
                  onMouseOut={(e) => e.target.style.background = '#3b82f6'}
                >
                  Ver más ({exhibicionesFiltradas.length - cantidadMostrada} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}