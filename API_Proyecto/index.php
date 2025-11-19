<?php
// --- INICIO DE LA SOLUCIÓN DE CORS ---
// Permite solicitudes desde cualquier origen. Para producción, cámbialo a tu dominio real.
header("Access-Control-Allow-Origin: *"); 
// Permite los métodos que usará tu frontend
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permite los encabezados que tu frontend pueda enviar
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Define el tipo de contenido que devuelves
header("Content-Type: application/json; charset=utf-8");

// Maneja la solicitud "pre-vuelo" de OPTIONS que envía el navegador
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Responde OK
    exit(0); // Y no continúes ejecutando el script
}
// --- FIN DE LA SOLUCIÓN DE CORS ---

echo json_encode([
    "nombre_api" => "API del Museo de Ciencias Naturales de La Pampa",
    "version" => "1.0",
    "endpoints_disponibles" => [
        "GET  /endpoints/list.php" => "Listar todas las imágenes y metadatos",
        "GET /endpoints/listarComentarios.php" => "Listar comentarios aprobados para una imagen",
        "POST /endpoints/upload.php" => "Subir nueva imagen y metadatos",
        "POST /endpoints/update.php" => "Actualizar metadatos de una imagen",
        "POST /endpoints/cargarComentario.php" => "Cargar un comentario para una imagen",
        "POST /endpoints/cargarContacto.php" => "Enviar mensaje desde formulario de contacto",
        "POST /endpoints/cargarVisita.php" => "Enviar solicitud de visita escolar",
        "DELETE /endpoints/delete.php" => "Eliminar una imagen"        
    ]
]);
?>