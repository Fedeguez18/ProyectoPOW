"use client"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/carrusel.module.css';
import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/config';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/ProyectoPOW/API_Proyecto';
const API_URL = `${API_BASE}/endpoints/listar_img.php?categoria=carrusel`;

export default function Carrusel() {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          id: item.id,
          src: getImageUrl(item.ruta),
          alt: item.titulo,
          title: item.titulo,
          subtitle: item.descripcion?.substring(0, 150) || '',
          categoria: item.categoria
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
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Cargando colecciones destacadas...</p>
        </div>
      </div>
    );
  }

  if (error || slidesData.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.errorContainer}>
          <p>No hay colecciones destacadas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {/* Indicador de slide actual */}
        <div className={styles.slideCounter}>
          <span className={styles.currentSlide}>{activeIndex + 1}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.totalSlides}>{slidesData.length}</span>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
          spaceBetween={50}
          slidesPerView={1}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          parallax={true}
          speed={800}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          navigation={{
            nextEl: `.${styles.customNext}`,
            prevEl: `.${styles.customPrev}`,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          loop={slidesData.length > 1}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className={styles.swiperContainer}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link href={`/exhibiciones/${slide.id}`} className={styles.slideLink}>
                <div className={styles.slideRoot}>
                  {/* Overlay gradient */}
                  <div className={styles.overlay}></div>
                  
                  {/* Imagen con efecto parallax */}
                  <div className={styles.imageContainer} data-swiper-parallax="-20%">
                    <Image 
                      src={slide.src}
                      alt={slide.alt} 
                      fill
                      className={styles.image}
                      priority={false}
                      unoptimized={true}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Caption con animación */}
                  <div className={styles.caption} data-swiper-parallax="-100">
                    <div className={styles.captionContent}>
                      <span className={styles.badge}>✨ Destacado</span>
                      <h3 className={styles.title}>{slide.title}</h3>
                      {slide.subtitle && (
                        <p className={styles.subtitle}>{slide.subtitle}</p>
                      )}
                      <div className={styles.viewMore}>
                        <span>Ver detalle</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación personalizados */}
        <button className={`${styles.navButton} ${styles.customPrev}`} aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.navButton} ${styles.customNext}`} aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}