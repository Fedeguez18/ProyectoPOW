'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/imagen.module.css';
import { API_BASE, getImageUrl } from '../utils/config';

export default function ImagenHome({ titulo, seccion }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imagenUrl, setImagenUrl] = useState(null);

  useEffect(() => {
    const fetchImagen = async () => {
      setLoading(true);
      setError(false);

      try {
        // Mapeo de secciones a categorías de banner
        const categoria = `banner-${seccion}`;
        
        // Hacer fetch a la API buscando por categoría
        const response = await fetch(
          `${API_BASE}/endpoints/listar_img.php?categoria=${encodeURIComponent(categoria)}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const imagenes = await response.json();
        
        // Si encuentra imágenes con esa categoría, usar la primera
        if (imagenes && imagenes.length > 0) {
          const url = getImageUrl(imagenes[0].ruta);
          setImagenUrl(url);
        } else {
          // Si no encuentra en la BD, usar imagen de fallback local
          const fallbackImages = {
            'inicio': '/recursos/home.jpg',
            'museo': '/recursos/museo.jpg',
            'exhibiciones': '/recursos/banner-exhibiciones.jpg',
            'contacto': '/recursos/contacto.jpg'
          };
          setImagenUrl(fallbackImages[seccion] || '/recursos/placeholder.jpg');
        }
      } catch (error) {
        console.error('Error al cargar la imagen del banner:', error);
        setError(true);
        
        // Fallback a imágenes locales en caso de error
        const fallbackImages = {
          'inicio': '/recursos/home.jpg',
          'museo': '/recursos/museo.jpg',
          'exhibiciones': '/recursos/banner-exhibiciones.jpg',
          'contacto': '/recursos/contacto.jpg'
        };
        setImagenUrl(fallbackImages[seccion] || '/recursos/placeholder.jpg');
      } finally {
        setLoading(false);
      }
    };

    if (seccion) {
      fetchImagen();
    }
  }, [seccion]);

  const getSeccionTexto = (seccion) => {
    switch(seccion) {
      case 'inicio':
        return '¡Bienvenidos al Museo de Ciencias Naturales! Explora y descubre el fascinante mundo que nos rodea.';
      case 'museo':
        return 'Sumérgete en el maravilloso universo de las ciencias naturales, donde cada pieza cuenta una historia única.';
      case 'exhibiciones':
        return 'Descubre nuestras exhibiciones y déjate llevar por la curiosidad científica.';
      case 'contacto':
        return 'Contacta con nuestro equipo para más información.';
      default:
        return '';
    }
  };

  
  const imagenBackground = imagenUrl ? { backgroundImage: `url(${imagenUrl})` } : {};

  return (
    <div className={styles.heroRoot} style={imagenBackground}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <p>Cargando imagen...</p>
        </div>
      )}
      {error && !loading && (
        <div className={styles.errorOverlay}>
          <p>⚠️ Error al cargar imagen (usando fallback)</p>
        </div>
      )}
      <div className={styles.heroContent}>
        <h1>{titulo}</h1>
        <div className={styles.sectionText}>
          {getSeccionTexto(seccion)}
        </div>
      </div>
    </div>
  );
}