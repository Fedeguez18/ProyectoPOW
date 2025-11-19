<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";


$imagen_id = isset($_GET['imagen_id']) ? intval($_GET['imagen_id']) : 0;

$sql = $conn->query("
    SELECT c.id, c.texto, c.fecha, u.nombre 
    FROM comentario c
    JOIN usuario u ON c.usuario_id = u.id_usuario
    WHERE c.imagen_id = $imagen_id AND c.aceptado = 1
    ORDER BY c.fecha DESC
");

$comentarios = [];

while ($row = $sql->fetch_assoc()) {
    $comentarios[] = $row;
}

echo json_encode($comentarios);
