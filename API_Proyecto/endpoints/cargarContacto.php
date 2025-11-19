<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "JSON inválido"]);
    exit;
}

// Validar campos requeridos
if (!isset($data["nombre"], $data["email"], $data["telefono"], $data["comentario"])) {
    echo json_encode(["success" => false, "message" => "Faltan campos requeridos"]);
    exit;
}

$nombre = trim($data["nombre"]);
$email  = trim($data["email"]);
$tel    = trim($data["telefono"]);
$comentario = trim($data["comentario"]);

// Validaciones adicionales
if (empty($nombre) || empty($email) || empty($tel) || empty($comentario)) {
    echo json_encode(["success" => false, "message" => "Los campos no pueden estar vacíos"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "El email no es válido"]);
    exit;
}

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO contacto (nombre, email, telefono, comentario) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $email, $tel, $comentario);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "¡Mensaje guardado con éxito! Nos pondremos en contacto pronto."
    ]);
} 
else {
    echo json_encode([
        "success" => false, 
        "message" => "Error al guardar en la base de datos: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>