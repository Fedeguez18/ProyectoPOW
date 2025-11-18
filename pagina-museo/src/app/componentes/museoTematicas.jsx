'use client'

import React, { useEffect, useState } from "react";
import styles from "../styles/museoTematicas.module.css";
import TematicaCarta from './tamaticaCarta';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';

function getPublicUrl(item) {
  const ruta = item?.ruta || item?.nombre_archivo || item?.imagen;
  
  // Si no hay ruta, usa un placeholder (asegúrate que exista en /public/recursos)
  if (!ruta) return '/recursos/placeholder.jpg';
  // Si por alguna razón ya es una URL completa
  if (ruta.startsWith('http')) return ruta;

  // Construye la URL final: http://localhost/API_Proyecto/uploads/imagen.jpg
  return `${API_BASE}/${ruta}`;
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
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
        let mounted = true;
        async function fetchData(){
            try{
                // CORRECCIÓN: Llama a tu endpoint en la subcarpeta 'endpoints'
                const res = await fetch(`${API_BASE}/endpoints/listar_img.php`);
                if (!res.ok) {
                  console.error("Error al cargar las temáticas:", res.statusText);
                  return;
                }
                const items = await res.json();
                
                // agrupar por categoria
                const groups = {};
                items.forEach(it => {
                    const cat = it.categoria || 'Generales';
                    groups[cat] = groups[cat] || [];
                    // Aquí usamos la función corregida
                    groups[cat].push(getPublicUrl(it)); 
                });

                const built = Object.keys(groups).map(cat => ({
                    id: slugify(cat),
                    titulo: cat,
                    images: groups[cat].slice(0, 4), // Toma hasta 4 imágenes por categoría
                    link: `/tematicas/${slugify(cat)}`,
                    color: DEFAULT_COLORS[cat] || '#e5e7eb'
                }));

                if(mounted) setTematicas(built);
            }catch(e){
                console.error("Error en fetch de temáticas:", e);
            }
        }
        fetchData();
        return () => { mounted = false };
    }, []);

    return (
        <section className={styles.museoTematicasRoot}>
            <h2 className={styles.tituloSeccion}>Temáticas del Museo</h2>
            <div className={styles.gridContainer}>
                {tematicas.map((tematica) => (
                    <TematicaCarta
                        key={tematica.id}
                        data={tematica}
                    />
                ))}
            </div>
        </section>
    );
}