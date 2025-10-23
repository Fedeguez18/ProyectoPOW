'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/tematicaCarta.module.css";

export default function TematicaCarta({ data, onHover, onLeave }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering]= useState(false);
    
    useEffect(() => {
        let interval;
        if(isHovering && data.images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
            }, 3000);
        }
        
        return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }, [isHovering, data.images.length]);

    const handleMouseEnter = () => { setIsHovering(true); };

    const handleMouseLeave = () => { setIsHovering(false); };

    return (
        <Link 
            href={data.link}
            className={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{'--card-color': data.color}}>
            <div className={styles.imageWrapper}>
                <Image 
                        src={data.images[currentImageIndex]}
                        alt={data.titulo}
                        fill
                        style={{objectFit: 'cover'}}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                />
            </div>
            <div className={styles.titleOverlay}>
                <span>{data.titulo}</span>
            </div>
            </Link>
    );
}