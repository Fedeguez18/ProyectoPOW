"use client";
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import estilobusqueda from '../styles/estilobusqueda.module.css';
import Link from 'next/link';

// URL de tu API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/ProyectoPOW/API_Proyecto';

export default function Busqueda({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Efecto para buscar (con "debounce" para no saturar la API)
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Espera 300ms después de que el usuario deja de escribir
    const timerId = setTimeout(() => {
      fetch(`${API_BASE}/endpoints/listar_img.php?search=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
        })
        .catch(err => {
          console.error("Error al buscar:", err);
          setResults([]); // Limpia resultados en caso de error
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timerId); // Limpia el temporizador si el usuario sigue escribiendo
  }, [query]); // Se ejecuta cada vez que 'query' cambia

  // Efecto para cerrar con 'Escape'
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Limpiar todo al cerrar
  const handleClose = () => {
    setQuery('');
    setResults([]);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={estilobusqueda.overlay} role="dialog" aria-modal="true">
      <button onClick={handleClose} className={estilobusqueda.closeButton} aria-label="Cerrar búsqueda">
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

        {/* --- SECCIÓN DE RESULTADOS --- */}
        <div className={estilobusqueda.resultsContainer}>
          {loading && <p className={estilobusqueda.loadingText}>Buscando...</p>}
          
          {!loading && results.length > 0 && (
            <ul className={estilobusqueda.resultsList}>
              {results.map(item => (
                <li key={item.id} className={estilobusqueda.resultItem}>
                  {/* El 'id' debe venir de la API (listar_img.php) */}
                  <Link href={`/exhibiciones/${item.id}`} onClick={handleClose}>
                    <span className={estilobusqueda.resultTitle}>{item.titulo}</span>
                    <span className={estilobusqueda.resultCategory}>{item.categoria}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!loading && results.length === 0 && query.trim() !== '' && (
            <p className={estilobusqueda.noResultsText}>
              No se encontraron resultados para "{query}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}