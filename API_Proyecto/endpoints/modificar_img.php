<?php
// --- INICIO DE CORRECCIÓN: Encabezados CORS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

/*if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}*/
// --- FIN DE CORRECCIÓN ---

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

if (!isset($_POST['id'])) {
    echo json_encode(["error" => "ID no recibido"]);
    exit;
}

$id = intval($_POST['id']);

$titulo = $_POST['titulo'] ?? '';
$categoria = $_POST['categoria'] ?? '';
$autor = $_POST['autor'] ?? '';
$fecha = $_POST['fecha'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$palabras = $_POST['palabras_clave'] ?? '';

$nuevaRuta = null;

// Si viene imagen nueva
if (!empty($_FILES['imagen']['name'])) {
    $img = $_FILES['imagen'];
    $ext = strtolower(pathinfo($img['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, ["jpg", "jpeg", "png"])) {
        echo json_encode(["error" => "Formato no permitido"]);
        exit;
    }

    $nuevaRuta = "../uploads/" . uniqid() . "." . $ext;

    if (!move_uploaded_file($img['tmp_name'], $nuevaRuta)) {
        echo json_encode(["error" => "No se pudo subir la nueva imagen"]);
        exit;
    }
}

// Actualizar
if ($nuevaRuta) {
    $sql = "UPDATE imagenes 
            SET ruta = ?, titulo = ?, categoria = ?, autor = ?, fecha = ?, descripcion = ?, palabras_clave = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssi", $nuevaRuta, $titulo, $categoria, $autor, $fecha, $descripcion, $palabras, $id);
} else {
    $sql = "UPDATE imagenes 
            SET titulo = ?, categoria = ?, autor = ?, fecha = ?, descripcion = ?, palabras_clave = ?
            WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $titulo, $categoria, $autor, $fecha, $descripcion, $palabras, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "mensaje" => "Imagen modificada"]);
} else {
    echo json_encode(["error" => "Error al modificar"]);
}
