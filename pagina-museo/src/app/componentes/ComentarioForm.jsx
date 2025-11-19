"use client";

import { useState } from "react";
import styles from "../styles/comentarioForm.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/App/ProyectoPOW/API_Proyecto';

export default function ComentarioForm({ imagenId, user }) {
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarComentario = async (e) => {
    e.preventDefault();

    if (texto.trim() === "") {
      setMensaje("El comentario no puede estar vacío.");
      return;
    }

    const res = await fetch(`${API_BASE}/endpoints/cargarComentario.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: user.id_usuario,
        uidd: user.uidd,
        imagen_id: imagenId,
        texto
      })
    });

    const json = await res.json();
    setMensaje(json.message);
    setTexto("");
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Deja un comentario</h3>

      <form onSubmit={enviarComentario}>
        <textarea
          className={styles.textarea}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={250}
          placeholder="Escribe tu comentario (máximo 250 caracteres)"
        />

        <button className={styles.submitButton} type="submit">
          Enviar comentario
        </button>
      </form>

      {mensaje && <p className={styles.feedback}>{mensaje}</p>}
    </div>
  );
}
