'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/filtroExhibiciones.module.css';

export default function FiltroExhibiciones({ onFiltrar, categorias = [], categoriaInicial = 'Todas' }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState('A-Z');

  // Nuevo estado para mostrar/ocultar filtros avanzados
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    setCategoriaSeleccionada(categoriaInicial);
  }, [categoriaInicial]);

  useEffect(() => {
    onFiltrar({
      busqueda,
      categoria: categoriaSeleccionada,
      orden: ordenSeleccionado
    });
  }, [busqueda, categoriaSeleccionada, ordenSeleccionado]);

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todas');
    setOrdenSeleccionado('A-Z');
  };

  return (
    <div className={styles.filtroWrapper}>
      
      {/* ░░░░ BARRA SUPERIOR: BUSQUEDA + BOTON FILTROS ░░░░ */}
      <div className={styles.header}>
        
        {/* Barra de búsqueda */}
        <div className={styles.busquedaWrapper}>
          <input
            type="text"
            className={styles.busquedaInput}
            placeholder="Buscar por título, descripción o palabras clave..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {busqueda && (
            <button 
              className={styles.limpiarBtn}
              onClick={() => setBusqueda('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Botón para abrir/cerrar filtros */}
        <button 
          className={styles.toggleFiltrosBtn}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
          <span 
            className={styles.toggleIcon}
            style={{ transform: mostrarFiltros ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </button>

      </div>

      {/* ░░░░ CONTENEDOR DESPLEGABLE DE FILTROS AVANZADOS ░░░░ */}
      <div className={`${styles.filtroContainer} ${mostrarFiltros ? styles.visible : ""}`}>
        
        <div className={styles.filtrosRow}>

          {/* Filtro por categoría */}
          <div className={styles.filtroGrupo}>
            <label className={styles.filtroLabel}>Categoría:</label>

            <div className={styles.categorias}>
              <button
                className={`${styles.categoriaBtn} ${categoriaSeleccionada === 'Todas' ? styles.active : ''}`}
                onClick={() => setCategoriaSeleccionada('Todas')}
              >
                Todas
              </button>

              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={`${styles.categoriaBtn} ${categoriaSeleccionada === categoria ? styles.active : ''}`}
                  onClick={() => setCategoriaSeleccionada(categoria)}
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
              onChange={(e) => setOrdenSeleccionado(e.target.value)}
            >
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="Recientes">Más recientes</option>
              <option value="Antiguos">Más antiguos</option>
            </select>
          </div>

        </div>

        {/* Botón limpiar filtros */}
        <div className={styles.accionesRow}>
          <button 
            className={styles.limpiarTodoBtn}
            onClick={limpiarFiltros}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
