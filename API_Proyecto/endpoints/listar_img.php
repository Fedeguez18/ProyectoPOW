<?php
// permitir sólo tu frontend (en prod cámbialo por el dominio real)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // opcional, sólo si envías cookies/credentials

// Responder preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

// ... El resto de tu código de consulta ...
// (Asegúrate de tener la lógica de ?search y ?categoria que te di antes)
$sql = "SELECT * FROM imagenes";
$params = [];
$types = "";
$conditions = [];

// (Aquí va la lógica de ?categoria y ?search)
if (isset($_GET['categoria'])) {
    $conditions[] = "categoria = ?";
    $params[] = $_GET['categoria'];
    $types .= "s";
}
if (isset($_GET['search'])) {
    $searchTerm = "%" . $_GET['search'] . "%";
    $conditions[] = "(titulo LIKE ? OR descripcion LIKE ? OR palabras_clave LIKE ?)";
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= "sss";
}
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

// (Preparar y ejecutar la consulta)
$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$imagenes = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imagenes[] = $row;
    }
}

echo json_encode($imagenes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$conn->close();
?>