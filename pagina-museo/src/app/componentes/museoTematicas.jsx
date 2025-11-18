'use client'
import React, { useEffect, useState } from "react";
import styles from "../styles/museoTematicas.module.css";
import TematicaCarta from './tamaticaCarta';
import { API_BASE, getImageUrl } from '../utils/config'; // Usamos la config centralizada

function slugify(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const DEFAULT_COLORS = {
  'Plantas': '#a7f3d0ab',
  'Paleontología': '#fce7f3',
  'Geología': '#fde68a',
  'Zoología': '#c7d2fe',
  'Arqueología': '#fbcfe8',
};

export default function MuseoTematicas() {
    const [tematicas, setTematicas] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try{
                // Usamos API_BASE importado
                const res = await fetch(`${API_BASE}/endpoints/listar_img.php`);
                if (!res.ok) return;
                
                const items = await res.json();
                const groups = {};
                
                items.forEach(it => {
                    const cat = it.categoria || 'Generales';
                    groups[cat] = groups[cat] || [];
                    // Usamos getImageUrl importado
                    groups[cat].push(getImageUrl(it.ruta || it.nombre_archivo)); 
                });

                const built = Object.keys(groups).map(cat => ({
                    id: slugify(cat),
                    titulo: cat,
                    images: groups[cat].slice(0, 4),
                    link: `/tematicas/${slugify(cat)}`,
                    color: DEFAULT_COLORS[cat] || '#e5e7eb'
                }));

                setTematicas(built);
            }catch(e){
                console.error(e);
            }
        }
        fetchData();
    }, []);

    return (
        <section className={styles.museoTematicasRoot}>
            <h2 className={styles.tituloSeccion}>Temáticas del Museo</h2>
            <div className={styles.gridContainer}>
                {tematicas.map((tematica) => (
                    <TematicaCarta key={tematica.id} data={tematica} />
                ))}
            </div>
        </section>
    );
}