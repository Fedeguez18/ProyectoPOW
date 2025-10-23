'use client'

import React, { useState } from "react";
import styles from "../styles/museoTematicas.module.css";
import { tematicasData } from "../data/tematicasData";
import TematicaCarta from './tamaticaCarta';

export default function MuseoTematicas() {
   
    return (
        <section className={styles.museoTematicasRoot}>
            <h2 className={styles.tituloSeccion}>Temáticas del Museo</h2>
            <div className={styles.gridContainer}>
                {tematicasData.map((tematica) => (
                    <TematicaCarta
                        key={tematica.id}
                        data={tematica}
                    />
                ))}
            </div>
        </section>
    );
}