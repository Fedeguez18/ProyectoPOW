"use client";

import { useEffect, useState } from "react";
import styles from "../styles/ComentariosList.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/ProyectoPOW/API_Proyecto";

export default function ComentariosList({ imagenId }) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/endpoints/listarComentarios.php?imagen_id=${imagenId}`)
      .then((res) => res.json())
      .then((data) => setComentarios(data));
  }, [imagenId]);

  return (
    <section className={styles.listSection}>
      <h3 className={styles.listTitle}>Comentarios</h3>

      <ul className={styles.list}>
        {comentarios.length === 0 && <p>No hay comentarios aún.</p>}

        {comentarios.map((c) => (
          <li key={c.id} className={styles.commentItem}>
            <span className={styles.commentUser}>{c.nombre}</span>
            <p className={styles.commentText}>{c.texto}</p>
            <span className={styles.commentDate}>{c.fecha}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
