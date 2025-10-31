<?php
require_once "../config/database.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("Content-Type: application/json; charset=utf-8");

$sql = "SELECT * FROM imagenes";
$result = $conn->query($sql);

$imagenes = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Aseguramos la URL completa del archivo (para el frontend)
        $imagenes[] = $row;
    }
}

echo json_encode($imagenes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$conn->close();
?>
