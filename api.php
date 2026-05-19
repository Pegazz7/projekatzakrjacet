<?php
session_start();

header("Content-Type: application/json");

ini_set('display_errors', 1);
error_reporting(E_ALL);

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$akcija = $_GET['akcija'] ?? '';

switch ($akcija) {

    // =========================
    // GET SERIJE (PUBLIC)
    // =========================
    case 'GET':

        $result = $conn->query("SELECT * FROM serije ORDER BY id DESC");

        $serije = [];

        while ($row = $result->fetch_assoc()) {
            $serije[] = $row;
        }

        echo json_encode([
            "success" => true,
            "data" => $serije
        ]);

    break;

    case 'DELETE':

    if (!isset($_SESSION['admin'])) {

        echo json_encode([
            "success" => false,
            "message" => "Niste prijavljeni kao admin"
        ]);

        exit;
    }

    $id = $_GET['id'] ?? 0;

    if ($id == 0) {

        echo json_encode([
            "success" => false,
            "message" => "Nedostaje ID"
        ]);

        exit;
    }

    $stmt = $conn->prepare("DELETE FROM serije WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        echo json_encode([
            "success" => true
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);
    }

break;

    // =========================
    // ADD SERIJA (ADMIN ONLY)
    // =========================
    case 'ADD_SERIJA':

        if (!isset($_SESSION['admin'])) {

            echo json_encode([
                "success" => false,
                "message" => "Niste prijavljeni kao admin"
            ]);

            exit;
        }

        $naziv = $data['naziv'] ?? '';
        $zanr = $data['zanr'] ?? '';
        $godina = $data['godina'] ?? '';
        $ocena = $data['ocena'] ?? '';
        $slika = $data['slika'] ?? '';

        $stmt = $conn->prepare("
            INSERT INTO serije
            (naziv, zanr, godina, ocena, slika)
            VALUES (?, ?, ?, ?, ?)
        ");

        $stmt->bind_param(
            "ssids",
            $naziv,
            $zanr,
            $godina,
            $ocena,
            $slika
        );

        if ($stmt->execute()) {

            echo json_encode([
                "success" => true
            ]);

        } else {

            echo json_encode([
                "success" => false,
                "message" => $stmt->error
            ]);
        }

    break;


    default:

        echo json_encode([
            "success" => false,
            "message" => "Nepoznata akcija"
        ]);

    break;
}
?>