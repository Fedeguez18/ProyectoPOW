<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
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
$req = ["escuela_nombre", "docente_nombre", "email", "cantidad_alumnos", "fecha_visita"];
foreach ($req as $r) {
    if (!isset($data[$r]) || trim($data[$r]) === "") {
        echo json_encode(["success" => false, "message" => "Falta el campo requerido: $r"]);
        exit;
    }
}

$escuela   = trim($data["escuela_nombre"]);
$docente   = trim($data["docente_nombre"]);
$email     = trim($data["email"]);
$telefono  = isset($data["telefono"]) ? trim($data["telefono"]) : "";
$cant      = intval($data["cantidad_alumnos"]);
$nivel     = isset($data["nivel"]) ? trim($data["nivel"]) : "";
$fecha     = trim($data["fecha_visita"]);
$coment    = isset($data["comentarios"]) ? trim($data["comentarios"]) : "";

// Validaciones adicionales
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "El email no es válido"]);
    exit;
}

if ($cant < 1) {
    echo json_encode(["success" => false, "message" => "La cantidad de alumnos debe ser al menos 1"]);
    exit;
}

// Validar que la fecha no sea en el pasado
$fecha_obj = DateTime::createFromFormat('Y-m-d', $fecha);
$hoy = new DateTime();
$hoy->setTime(0, 0, 0);

if (!$fecha_obj || $fecha_obj < $hoy) {
    echo json_encode(["success" => false, "message" => "La fecha de visita debe ser futura"]);
    exit;
}

// Insertar en la base de datos
$stmt = $conn->prepare("
  INSERT INTO visitas_escolares
  (escuela_nombre, docente_nombre, email, telefono, cantidad_alumnos, nivel, fecha_visita, comentarios)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssssisss",
    $escuela, $docente, $email, $telefono, $cant, $nivel, $fecha, $coment
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "¡Solicitud de visita guardada con éxito! Nos pondremos en contacto pronto para confirmar."
    ]);
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Error al guardar la solicitud: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>