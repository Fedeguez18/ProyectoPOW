'use client';
import { useState } from "react";
import '../styles/formularioContacto.css';

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
          <label htmlFor="nombre_solicitante">Nombre y apellido*</label>
          <input type="text" id="nombre_solicitante" name="nombre_solicitante" required />
        </div>
        <div className="form-group">
          <label htmlFor="email_solicitante">Correo electrónico*</label>
          <input type="email" id="email_solicitante" name="email_solicitante" required />
          <small>Este dato no será mostrado públicamente</small>
        </div>
        <div className="form-group">
          <label htmlFor="telefono_solicitante">Teléfono*</label>
          <input type="tel" id="telefono_solicitante" name="telefono_solicitante" required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre_responsable">Nombre y apellido del responsable</label>
          <input type="text" id="nombre_responsable" name="nombre_responsable" />
        </div>
        <div className="form-group">
          <label htmlFor="institucion">Institución</label>
          <input type="text" id="institucion" name="institucion" />
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
        <label htmlFor="nivel_curso">Nivel/es del curso</label>
        <textarea id="nivel_curso" name="nivel_curso" rows="4"></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="num_alumnos">Número de alumnos</label>
          <input type="number" id="num_alumnos" name="num_alumnos" min="1" />
        </div>
        <div className="form-group">
          <label htmlFor="num_acompanantes">Número de acompañantes mayores</label>
          <input type="number" id="num_acompanantes" name="num_acompanantes" min="1" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fecha_visita">Fecha de la visita</label>
          <input type="date" id="fecha_visita" name="fecha_visita" />
        </div>
        <div className="form-group">
          <label htmlFor="hora_visita">Hora de la visita</label>
          <input type="text" id="hora_visita" name="hora_visita" placeholder="HH:MM" />
          <small>Utilice formato HH:MM, por ejemplo 12:30</small>
        </div>
      </div>
      <small className="form-hint">
        Verifique los horarios de visitas guiadas en la sección "Visita" de
        nuestro portal e indique un horario estimativo e ideal...
      </small>

      <div className="form-group">
        <label htmlFor="comentario_visita">Comentario*</label>
        <textarea id="comentario_visita" name="comentario_visita" rows="6" required></textarea>
      </div>
    </>
  );
}

export default function Formulario(){
    const [tipoF, setTipoF]= useState('contacto');

    const handleTipoChange = (e) => {
        setTipoF(e.target.value);
    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Datos del formulario:", data);
        alert("Formulario enviado. Gracias por contactarnos.");
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