'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cartaExhibiciones.module.css";
import { getImageUrl } from '../utils/config';

export default function CartaExhibiciones({ item }) {
    // Construir URL de imagen
    const imgUrl = getImageUrl(item.ruta || item.imagen || item.nombre_archivo);
    
    // Descripción breve (tomar los primeros 120 caracteres de la descripción)
    const descripcionBreve = item.descripcion 
      ? item.descripcion.substring(0, 120) + (item.descripcion.length > 120 ? '...' : '')
      : 'Sin descripción disponible';

    return (
        <Link href={`/exhibiciones/${item.id}`} className={styles.carta}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imgUrl}
                    alt={item.titulo || 'Imagen de exhibición'}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    unoptimized={true}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.titulo}</h3>
                <p className={styles.description}>{descripcionBreve}</p>
                <span className={styles.linkText}>Ver más →</span>
            </div>
         </Link>
    );
}