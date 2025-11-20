'use client'
import React, { useEffect, useState } from "react";
import styles from "../styles/museoTematicas.module.css";
import TematicaCarta from './tamaticaCarta';
import { API_BASE, getImageUrl } from '../utils/config';

function slugify(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const DEFAULT_COLORS = {
  'Plantas': '#a7f3d0ab',
  'Paleontología': '#fce7f3',
  'Geología': '#fde68a',
  'Zoología': '#c7d2fe',
  'Arqueología': '#fbcfe8',
  'Minerales': '#ddd6fe',
  'Fósiles': '#fed7aa',
  'Insectos': '#fecaca',
};

export default function MuseoTematicas() {
    const [todasTematicas, setTodasTematicas] = useState([]);
    const [tematicasVisibles, setTematicasVisibles] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        async function fetchData(){
            try{
                const res = await fetch(`${API_BASE}/endpoints/listar_img.php`);
                if (!res.ok) return;
                
                const items = await res.json();
                const groups = {};
                
                items.forEach(it => {
                    const cat = it.categoria || 'Generales';
                    
                    // ⚡ FILTRAR categorías que empiezan con "banner-"
                    if (cat.toLowerCase().startsWith('banner-') ) {
                        return; // Saltar esta categoría
                    }
                    if (['carrusel', 'home-museo'].includes(cat.toLowerCase())) {
                        return; // Saltar estas categorías
                    }
                    
                    groups[cat] = groups[cat] || [];
                    groups[cat].push(getImageUrl(it.ruta || it.nombre_archivo)); 
                });

                const built = Object.keys(groups).map(cat => ({
                    id: slugify(cat),
                    titulo: cat,
                    images: groups[cat].slice(0, 4),
                    // ⚡ CAMBIO: Enlazar a exhibiciones con filtro de categoría
                    link: `/exhibiciones?categoria=${encodeURIComponent(cat)}`,
                    color: DEFAULT_COLORS[cat] || '#e5e7eb'
                }));

                setTodasTematicas(built);
                // Mostrar las primeras 4
                setTematicasVisibles(built.slice(0, 4));
            }catch(e){
                console.error(e);
            }
        }
        fetchData();
    }, []);

    // Rotación automática cada 8 segundos (solo si hay más de 4 categorías)
    useEffect(() => {
        if (todasTematicas.length <= 4) return;

        const interval = setInterval(() => {
            rotarTematicas();
        }, 8000);

        return () => clearInterval(interval);
    }, [todasTematicas, indiceActual]);

    const rotarTematicas = () => {
        if (todasTematicas.length <= 4) return;

        setTransitioning(true);
        
        setTimeout(() => {
            const nuevoIndice = (indiceActual + 4) % todasTematicas.length;
            const siguientes = [];
            
            // Obtener las siguientes 4 (con wrap-around si es necesario)
            for (let i = 0; i < 4; i++) {
                const idx = (nuevoIndice + i) % todasTematicas.length;
                siguientes.push(todasTematicas[idx]);
            }
            
            setTematicasVisibles(siguientes);
            setIndiceActual(nuevoIndice);
            setTransitioning(false);
        }, 300);
    };

    const rotarManual = (direccion) => {
        if (todasTematicas.length <= 4) return;

        setTransitioning(true);
        
        setTimeout(() => {
            let nuevoIndice;
            if (direccion === 'siguiente') {
                nuevoIndice = (indiceActual + 4) % todasTematicas.length;
            } else {
                nuevoIndice = (indiceActual - 4 + todasTematicas.length) % todasTematicas.length;
            }
            
            const siguientes = [];
            for (let i = 0; i < 4; i++) {
                const idx = (nuevoIndice + i) % todasTematicas.length;
                siguientes.push(todasTematicas[idx]);
            }
            
            setTematicasVisibles(siguientes);
            setIndiceActual(nuevoIndice);
            setTransitioning(false);
        }, 300);
    };

    return (
        <section className={styles.museoTematicasRoot}>
            <div className={styles.headerWrapper}>
                <h2 className={styles.tituloSeccion}>Temáticas del Museo</h2>
            </div>

            <div className={`${styles.gridContainer} ${transitioning ? styles.transitioning : ''}`}>
                {tematicasVisibles.map((tematica) => (
                    <TematicaCarta key={tematica.id} data={tematica} />
                ))}
            </div>

            {/* Controls bar centered below the carousel */}
            {todasTematicas.length > 4 && (
                <div className={styles.controlsBar} aria-hidden={false}>
                    <button 
                        onClick={() => rotarManual('anterior')}
                        className={styles.controlBtn}
                        aria-label="Anterior"
                    >
                        <span className={styles.chev}>‹</span>
                        <span className={styles.srOnly}>Anterior</span>
                    </button>

                    <span className={styles.indicador} aria-live="polite">
                        {Math.floor(indiceActual / 4) + 1} / {Math.ceil(todasTematicas.length / 4)}
                    </span>

                    <button 
                        onClick={() => rotarManual('siguiente')}
                        className={styles.controlBtn}
                        aria-label="Siguiente"
                    >
                        <span className={styles.chev}>›</span>
                        <span className={styles.srOnly}>Siguiente</span>
                    </button>
                </div>
            )}
        </section>
    );
}