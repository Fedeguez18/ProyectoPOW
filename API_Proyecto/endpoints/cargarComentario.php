<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once __DIR__ . "/../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$required = ["escuela", "docente", "email", "fecha", "alumnos"];
foreach ($required as $r) {
  if (!isset($data[$r]) || trim($data[$r]) === "") {
      echo json_encode(["success" => false, "message" => "Falta el campo: $r"]);
      exit;
  }
}

$escuela = $data["escuela"];
$docente = $data["docente"];
$email = $data["email"];
$telefono = $data["telefono"] ?? null;
$fecha = $data["fecha"];
$alumnos = intval($data["alumnos"]);
$comentarios = $data["comentarios"] ?? "";
$ip = $_SERVER["REMOTE_ADDR"];

$stmt = $conn->prepare("
  INSERT INTO visitas_escolares (escuela_nombre, docente_nombre, email, telefono, fecha_visita, cantidad_alumnos, comentarios, ip) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("sssssi ss", $escuela, $docente, $email, $telefono, $fecha, $alumnos, $comentarios, $ip);

if ($stmt->execute()) {

    // ------- EMAIL AL ADMIN ------
    $to = "federico.rodriguez@ing.unlpam.edu.ar";
    $subject = "Nueva visita escolar";
    $body = "Escuela: $escuela\nDocente: $docente\nEmail: $email\nFecha solicitada: $fecha\nAlumnos: $alumnos\n\nComentarios:\n$comentarios\n";
    $headers = "From: no-reply@museo.com";

    @mail($to, $subject, $body, $headers);

    echo json_encode(["success" => true, "message" => "Solicitud enviada con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar en BD"]);
}
