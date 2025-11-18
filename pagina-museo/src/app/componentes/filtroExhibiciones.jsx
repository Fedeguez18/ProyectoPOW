'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/filtroExhibiciones.module.css';

export default function FiltroExhibiciones({ onFiltrar, categorias = [] }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('A-Z');

  // Ejecutar filtrado cada vez que cambie algún criterio
  useEffect(() => {
    onFiltrar({
      busqueda,
      categoria: categoriaSeleccionada,
      orden: ordenSeleccionado
    });
  }, [busqueda, categoriaSeleccionada, ordenSeleccionado]);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleOrdenClick = (orden) => {
    setOrdenSeleccionado(orden);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todas');
    setOrdenSeleccionado('A-Z');
  };

  return (
    <div className={styles.filtroContainer}>
      {/* Barra de búsqueda */}
      <div className={styles.busquedaWrapper}>
        <input
          type="text"
          className={styles.busquedaInput}
          placeholder="Buscar por título, descripción o palabras clave..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        {busqueda && (
          <button 
            className={styles.limpiarBtn}
            onClick={() => setBusqueda('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.filtrosRow}>
        {/* Filtro por categoría */}
        <div className={styles.filtroGrupo}>
          <label className={styles.filtroLabel}>Categoría:</label>
          <div className={styles.categorias}>
            <button
              className={`${styles.categoriaBtn} ${categoriaSeleccionada === 'Todas' ? styles.active : ''}`}
              onClick={() => handleCategoriaClick('Todas')}
            >
              Todas
            </button>
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className={`${styles.categoriaBtn} ${categoriaSeleccionada === categoria ? styles.active : ''}`}
                onClick={() => handleCategoriaClick(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenar por */}
        <div className={styles.filtroGrupo}>
          <label className={styles.filtroLabel}>Ordenar por:</label>
          <select 
            className={styles.ordenSelect}
            value={ordenSeleccionado}
            onChange={(e) => handleOrdenClick(e.target.value)}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Recientes">Más recientes</option>
            <option value="Antiguos">Más antiguos</option>
          </select>
        </div>

        {/* Botón limpiar filtros */}
        <button 
          className={styles.limpiarTodoBtn}
          onClick={limpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}