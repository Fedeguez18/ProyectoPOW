'use client';
import { useState } from "react";
import '../styles/formularioContacto.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/ProyectoPOW/API_Proyecto';

const ENDPOINTS = {
  contacto: `${API_BASE}/endpoints/cargarContacto.php`,
  visita: `${API_BASE}/endpoints/cargarVisita.php`,
};

function CampoContacto() {
  return (
    <>
      <div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre y apellido*</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico*</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono*</label>
            <input type="tel" id="telefono" name="telefono" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comentario">Comentario*</label>
          <textarea id="comentario" name="comentario" rows="6" required></textarea>
        </div>

      </div>
    </>
  );
}

function CampoVisitaEscolar() {
  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="docente_nombre">Nombre y apellido del docente*</label>
          <input type="text" id="docente_nombre" name="docente_nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico*</label>
          <input type="email" id="email" name="email" required />
          <small>Este dato no será mostrado públicamente</small>
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="escuela_nombre">Nombre de la institución*</label>
          <input type="text" id="escuela_nombre" name="escuela_nombre" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="provincia">Provincia</label>
          <input type="text" id="provincia" name="provincia" />
        </div>
        <div className="form-group">
          <label htmlFor="localidad">Localidad</label>
          <input type="text" id="localidad" name="localidad" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="nivel">Nivel/es del curso</label>
        <textarea id="nivel" name="nivel" rows="4"></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cantidad_alumnos">Número de alumnos*</label>
          <input type="number" id="cantidad_alumnos" name="cantidad_alumnos" min="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="num_acompanantes">Número de acompañantes mayores</label>
          <input type="number" id="num_acompanantes" name="num_acompanantes" min="0" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fecha_visita">Fecha de la visita*</label>
          <input type="date" id="fecha_visita" name="fecha_visita" required />
        </div>
        <div className="form-group">
          <label htmlFor="hora_visita">Hora de la visita</label>
          <input type="time" id="hora_visita" name="hora_visita" />
          <small>Seleccione un horario estimativo</small>
        </div>
      </div>
      <small className="form-hint">
        Verifique los horarios de visitas guiadas en la sección "Visita" de
        nuestro portal e indique un horario estimativo e ideal...
      </small>

      <div className="form-group">
        <label htmlFor="comentarios">Comentarios adicionales</label>
        <textarea id="comentarios" name="comentarios" rows="6"></textarea>
      </div>
    </>
  );
}





export default function Formulario() {
  const [tipoF, setTipoF] = useState('contacto');
  // Nuevo estado para manejar el envío
  const [formStatus, setFormStatus] = useState({ sending: false, message: '', error: false });

  const handleTipoChange = (e) => {
    setTipoF(e.target.value);
  };

  // CORRECCIÓN: Implementar el envío a la API
 const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus({ sending: true, message: "Enviando...", error: false });

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const endpoint = tipoF === "contacto"
    ? ENDPOINTS.contacto
    : ENDPOINTS.visita;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      setFormStatus({ sending: false, message: result.message, error: false });
      e.target.reset();
    } else {
      throw new Error(result.message || "Error desconocido");
    }
  } catch (error) {
    setFormStatus({
      sending: false,
      message: "Error al enviar: " + error.message,
      error: true,
    });
  }
};
  return (
    <div className="contacto-container">
      <h2>Formulario de Contacto</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tipo_contacto">Tipo de contacto*</label>
          <select
            id="tipo_contacto"
            name="tipo_contacto"
            value={tipoF}
            onChange={handleTipoChange}
          >
            <option value="contacto">Contacto</option>
            <option value="visita">Turnos para visitas escolares</option>
          </select>
        </div>

        {/* 3. Renderizado Condicional: 
          Muestra un set de campos o el otro basado en el estado 'tipoFormulario'
        */}
        {tipoF === 'contacto' ? (
          <CampoContacto />
        ) : (
          <CampoVisitaEscolar />
        )}

        <div className="form-group">
          <button type="submit" className="submit-btn">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}