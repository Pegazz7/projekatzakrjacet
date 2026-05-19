<?php
session_start();

header("Content-Type: application/json");

ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if ($username === "admin" && $password === "admin") {

    $_SESSION['admin'] = true;

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Pogrešan username ili password"
    ]);
}
?>