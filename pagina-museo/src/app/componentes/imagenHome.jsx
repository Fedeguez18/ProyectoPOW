import Image from 'next/image';
import styles from '../styles/imagen.module.css';

// Componente simplificado: siempre muestra una imagen fija desde `public`
export default function ImagenHome({ imagenSrc, titulo, seccion }) {
  const imagenBackground = { backgroundImage: `url(${imagenSrc})`};
  
  const getSeccionTexto = (seccion) => {
    switch(seccion) {
      case 'inicio':
        return <><p>¡Bienvenidos al Museo de Ciencias Naturales!</p><p>Explora y descubre el fascinante mundo que nos rodea</p></>;
      case 'museo':
        return <><p>Sumérgete en el maravilloso universo de las ciencias naturales, donde cada pieza cuenta una historia única</p></>;
      case 'exhibiciones':
        return <><p>Descubre nuestras exhibiciones y déjate llevar por la curiosidad científica.</p></>;
      case 'contacto':
        return <><p>Contacta con nuestro equipo para más información</p></>;
      default:
        return '';
    }
  };

  return (
    <div className={styles.heroRoot} style={imagenBackground}>
      <div className={styles.heroContent}>
        <h1>{titulo}</h1>
        <p className={styles.sectionText}>{getSeccionTexto(seccion)}</p>
      </div>
    </div>
  );
}