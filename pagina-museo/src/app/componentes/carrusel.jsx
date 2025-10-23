"use client"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import styles from '../styles/carrusel.module.css';


// Importar imágenes estáticamente desde src/app/recursos
// Usamos rutas públicas (carpeta `public/recursos`) accesibles desde la URL raíz
const imgA = '/recursos/2107.w026.n002.637B.p1.637.jpg';
const imgB = '/recursos/165186-los_efectos_visuales-gamer-juego_de_aventura_de_accion-evento-espacio-3840x2160.jpg';
const imgC = '/recursos/img1.wallspic.com-luna_llena-objeto_astronomico-ambiente-evento_celestial-luz-7116x5025.jpg';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Datos de ejemplo para las imágenes
const slidesData = [
  { id: 1, src: imgA, alt: 'Imagen 1', title: 'Montañas de Aurora', subtitle: 'Respira profundo y disfruta el paisaje' },
  { id: 2, src: imgB, alt: 'Imagen 2', title: 'Ciudad Neon', subtitle: 'Luces, lluvia y aventuras nocturnas' },
  { id: 3, src: imgC, alt: 'Imagen 3', title: 'Luna Misteriosa', subtitle: 'Silencio cósmico y calma' },
];


export default function Carrusel() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
      <Swiper
        // Instala los módulos que vamos a usar
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slideRoot}>
              {/* Usamos el componente Image de Next.js para optimización */}
              <Image 
                src={slide.src} 
                alt={slide.alt} 
                width={900} 
                height={450} 
                className={styles.image}
                priority={false}
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