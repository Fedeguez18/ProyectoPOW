import Image from 'next/image';
import styles from '../styles/imagen.module.css';

// Componente simplificado: siempre muestra una imagen fija desde `public`
export default function ImagenHome({ imagenSrc, titulo,  }) {
  const imagenBackground = { backgroundImage: `url(${imagenSrc})`};
  return (// 1. Este es el contenedor principal que tendrá la imagen parallax
    <div className={styles.heroRoot} style={imagenBackground}>
      
      {/* 2. Este es un contenedor interno para centrar tu texto */}
      <div className={styles.heroContent}>
        <h1>{titulo}</h1>
        <p>Descubre las maravillas de nuestro museo</p>
      </div>

    </div>
  );
}