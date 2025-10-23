// components/Navbar.jsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from '../styles/navbar.module.css';
import Busqueda from './busqueda'; // 1. Importamos el nuevo componente

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false); // Estado para controlar el overlay
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Usamos un Fragment (<>) para poder devolver dos componentes hermanos: nav y SearchOverlay
    <>
      <nav className={isScrolled ? `${styles.navRoot} ${styles.scrolled}` : styles.navRoot}>
        <div className={styles.container}>
          {/* === LOGO Y TÍTULO === */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/recursos/logo.png"
                alt="Logo del Museo" 
                width={100} 
                height={100} 
              />
              <h1 className="text-xl font-bold text-gray-800">
                Museo de Ciencias Naturales
              </h1>
            </Link>
          </div>

          {/* === LINKS DE NAVEGACIÓN === */}
          <div className={`hidden md:flex items-center ${styles.navLinks}`}>
            <ul className="flex items-center">
              {/* Simplemente quita className={styles.link} de todos */}
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/museo">Museo</Link></li>
              <li><Link href="/exhibiciones">Exhibiciones</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          {/* === ZONA DERECHA: BÚSQUEDA Y AVATAR === */}
          <div className={styles.rightSection}>
            {/* 2. Este botón ahora solo necesita abrir el overlay */}
            <button 
              className={styles.searchBtn} 
              onClick={() => setSearchOpen(true)} 
              aria-label="Abrir búsqueda"
            >
              <Search size={22} />
            </button>
          </div>

           <div className={styles.avatar}>
              <Image 
                src='/file.svg'
                alt="Foto de perfil del usuario"
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
        </div>
      </nav>
      
      {/* 3. Renderizamos el overlay y le pasamos el estado y la función para cerrarlo */}
      <Busqueda isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

