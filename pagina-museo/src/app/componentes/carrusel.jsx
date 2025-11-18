"use client"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/carrusel.module.css';

// 1. Importar hooks de React
import { useState, useEffect } from 'react';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 2. Definir la URL de tu API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';
// Llama a la categoría 'carrusel' (¡Debes crearla en tu BD!)
const API_URL = `${API_BASE}/endpoints/listar_img.php?categoria=carrusel`;

export default function Carrusel() {
  // 3. Estados para datos, carga y error
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. Hook para llamar a la API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        
        // 5. Mapear datos de la BD a lo que el componente espera
        const formattedData = data.map(item => ({
          id: item.id,
          // Construye la URL completa de la imagen
          src: `${API_BASE}/${item.ruta}`, 
          alt: item.titulo,
          title: item.titulo,
          subtitle: item.descripcion.substring(0, 100) + '...' // Acorta la descripción
        }));

        setSlidesData(formattedData);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar los datos del carrusel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []); // El array vacío [] significa que se ejecuta solo una vez

  // 6. Manejar estados de carga y error
  if (loading) {
    return <div className={styles.wrapper}>Cargando carrusel...</div>;
  }

  if (error) {
    return <div className={styles.wrapper}>Error al cargar carrusel: {error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={50}
          slidesPerView={1}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={slidesData.length > 1} // Desactiva el loop si solo hay 1 imagen
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.slideRoot}>
                <Image 
                  src={slide.src} // Esta ya es una URL completa
                  alt={slide.alt} 
                  width={900} 
                  height={450} 
                  className={styles.image}
                  priority={false}
                  // Importante para imágenes externas en Next.js
                  unoptimized={true} 
                />
                <div className={styles.caption}>
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}