
"use client";
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import estilobusqueda from '../styles/estilobusqueda.module.css';

export default function Busqueda({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  // Efecto para cerrar el overlay con la tecla 'Escape'
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Solo agregar el listener si el overlay está abierto
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Limpiar el listener cuando el componente se desmonte o el estado cambie
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Evitar renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className={estilobusqueda.overlay} role="dialog" aria-modal="true">
      <button onClick={onClose} className={estilobusqueda.closeButton} aria-label="Cerrar búsqueda">
        <X size={32} />
      </button>
      <div className={estilobusqueda.searchContainer}>
        <div className={estilobusqueda.inputWrapper}>
          <Search size={24} className={estilobusqueda.searchIcon} />
          <input
            type="text"
            className={estilobusqueda.searchInput}
            placeholder="Busca en todo el museo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
