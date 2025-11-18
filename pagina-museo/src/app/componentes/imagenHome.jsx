import Image from 'next/image';
import styles from '../styles/imagen.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';

export default function ImagenHome({ imagenSrc, titulo, seccion }) {
  const src = imagenSrc 
    ? `${API_BASE}/${imagenSrc}` 
    : '/recursos/banner-exhibiciones.jpg'; // Asegúrate que este placeholder exista en /public/recursos

  const imagenBackground = { backgroundImage: `url(${src})` };
  
  const getSeccionTexto = (seccion) => {
    // ... (esta función no cambia)
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

  return (
    <div className={styles.heroRoot} style={imagenBackground}>
      <div className={styles.heroContent}>
        <h1>{titulo}</h1>
        <div className={styles.sectionText}>{getSeccionTexto(seccion)}</div>
      </div>
    </div>
  );
}