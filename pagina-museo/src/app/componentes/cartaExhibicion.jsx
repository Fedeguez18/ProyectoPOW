'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cartaExhibiciones.module.css";

export default function CartaEXhibiciones({ item }) {
    return (
        <Link href={`/exhibiciones/${item.id}`} className={styles.carta}>
            <div className={styles.imageWrapper}>
                <Image
                    src={item.imagen}
                    alt={item.titulo}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}></Image>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.titulo}</h3>
                <p className={styles.description}>{item.descripcionBreve}</p>
                <span className={styles.linkText}>Ver más</span>
            </div>
         </Link>
    );
}