'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cartaExhibiciones.module.css";
import { getImageUrl } from '../utils/config';

export default function CartaEXhibiciones({ item }) {
    const imgUrl = getImageUrl(item.imagen || item.ruta);
    return (
        <Link href={`/exhibiciones/${item.id}`} className={styles.carta}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imgUrl}
                    alt={item.titulo}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    unoptimized={true}></Image>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.titulo}</h3>
                <p className={styles.description}>{item.descripcionBreve}</p>
                <span className={styles.linkText}>Ver más</span>
            </div>
         </Link>
    );
}