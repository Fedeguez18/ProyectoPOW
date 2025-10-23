'use client';

import React from "react";
import styles from "../styles/mapaUbicacion.module.css";

export default function MapaUbicacion() {
    return (
        <section className={styles.mapSection}>
            <h2 className={styles.tituloSeccion}>Nuestra Ubicación</h2>
            <div className={styles.mapWrapper}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.32021960242!2d-64.2926665!3d-36.618677999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c2cd08581d0253%3A0x1f259074626aff70!2sMuseo%20Provincial%20de%20Historia%20Natural!5e0!3m2!1ses!2sar!4v1760899888739!5m2!1ses!2sar"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
        </div>
        </section >
    );
}