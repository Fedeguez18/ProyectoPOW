<?php
require_once "../config/database.php";
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$userId = $_GET["uidd"] ?? null;

$query = $conn->prepare("SELECT premiun, nombre, rol FROM usuario WHERE uidd = ?");
$query->bind_param("s", $userId);
$query->execute();
$result = $query->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "rol" => $row["rol"],
        "premiun" => $row["premiun"],
        "nombre" => $row["nombre"]
    ]);
} else {
    echo json_encode([
        "rol" => $row["rol"],
        "premiun" => 15, // o null
        "mensaje" => "Usuario no encontrado"
    ]);
}

$conn->close();
?>