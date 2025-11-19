
"use client";
import React, { useEffect, useState } from "react";
import "./gestion.css";

const ImagenesAdmin = () => {
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        titulo: "",
        categoria: "",
        autor: "",
        fecha: "",
        descripcion: "",
        palabras_clave: "",
        imagen: null,
    });

    // ────────────────────────────────────────────
    // LISTAR IMÁGENES
    // ────────────────────────────────────────────
    const obtenerImagenes = async () => {
        try {
            const res = await fetch(
                "http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/listar_img.php"
            );

            const data = await res.json();

            setImagenes(data);
        } catch (error) {
            console.error("Error al obtener imágenes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerImagenes();
    }, []);

    // ────────────────────────────────────────────
    // MANEJO DE FORM (TEXTOS)
    // ────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Si selecciona imagen
        if (name === "imagen") {
            const file = files[0];
            setFormData({ ...formData, imagen: file });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // ────────────────────────────────────────────
    // ENVIAR FORMULARIO (CREAR O EDITAR)
    // ────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = new FormData();
        datos.append("titulo", formData.titulo);
        datos.append("categoria", formData.categoria);
        datos.append("autor", formData.autor);
        datos.append("fecha", formData.fecha);
        datos.append("descripcion", formData.descripcion);
        datos.append("palabras_clave", formData.palabras_clave);

        // Si viene archivo
        if (formData.imagen) {
            datos.append("imagen", formData.imagen);
            datos.append("name", formData.imagen.name);
        }

        let endpoint = "";
        if (modoEdicion) {
            datos.append("id", formData.id);
            endpoint =
                "http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/modificar_img.php";
        } else {
            endpoint =
                "http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/subir_img.php";
        }

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                body: datos,
            });

            const data = await res.json();
            console.log("RESPUESTA API:", data);

            if (data.error) {
                alert("error " + data.error);
                return;
            }

            alert("✅ Operación exitosa");

            resetFormulario();
            obtenerImagenes();
        } catch (error) {
            console.error("Error en el envío:", error);
            alert("Error al conectar con el servidor");
        }
    };

    // ────────────────────────────────────────────
    // EDITAR IMAGEN
    // ────────────────────────────────────────────
    const editarImagen = (img) => {
        setModoEdicion(true);

        setFormData({
            id: img.id,
            titulo: img.titulo,
            categoria: img.categoria,
            autor: img.autor,
            fecha: img.fecha,
            descripcion: img.descripcion,
            palabras_clave: img.palabras_clave,
            imagen: null,
        });

        setPreview(`http://localhost/App/ProyectoPOW/API_Proyecto/uploads/${img.ruta}`);
    };

    // ────────────────────────────────────────────
    // ELIMINAR IMAGEN
    // ────────────────────────────────────────────
    const eliminarImagen = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta imagen?")) return;

        try {
            const res = await fetch(
                "http://localhost/App/ProyectoPOW/API_Proyecto/endpoints/eliminar_img.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                }
            );

            const data = await res.json();
            alert(data.mensaje || data.error);
            obtenerImagenes();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    // ────────────────────────────────────────────
    // RESET FORMULARIO
    // ────────────────────────────────────────────
    const resetFormulario = () => {
        setModoEdicion(false);
        setFormData({
            id: "",
            titulo: "",
            categoria: "",
            autor: "",
            fecha: "",
            descripcion: "",
            palabras_clave: "",
            imagen: null,
        });
        setPreview(null);
    };

    // ────────────────────────────────────────────
    // RENDER
    // ────────────────────────────────────────────
    if (loading) return <p>Cargando imágenes...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Gestión de Imágenes</h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
                <h3>
                    {modoEdicion ? "Editar imagen" : "Agregar nueva imagen"}
                </h3>

                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa"
                        width="150"
                        style={{ borderRadius: "6px", marginBottom: "10px" }}
                    />
                )}

                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoría"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="autor"
                    placeholder="Autor"
                    value={formData.autor}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                ></textarea>

                <input
                    type="text"
                    name="palabras_clave"
                    placeholder="Palabras clave"
                    value={formData.palabras_clave}
                    onChange={handleChange}
                />

                <label>Archivo (opcional):</label>
                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button type="submit">
                    {modoEdicion ? "Guardar cambios" : "Subir imagen"}
                </button>

                {modoEdicion && (
                    <button type="button" onClick={resetFormulario}>
                        Cancelar
                    </button>
                )}
            </form>

            {/* LISTADO */}
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vista previa</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Fecha</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {imagenes.map((img) => (
                        <tr key={img.id}>
                            <td>{img.id}</td>
                            <td>
                                <img
                                    src={`http://localhost/App/ProyectoPOW/API_Proyecto/uploads/${img.ruta}`}
                                    alt={img.titulo}
                                    width="80"
                                />
                            </td>
                            <td>{img.titulo}</td>
                            <td>{img.autor}</td>
                            <td>{img.fecha}</td>
                            <td>{img.categoria}</td>
                            <td>
                                <button onClick={() => editarImagen(img)}>
                                    Editar
                                </button>

                                <button id="elim" onClick={() => eliminarImagen(img.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImagenesAdmin;
