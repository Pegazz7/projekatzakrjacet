<?php
session_start();

if(!isset($_SESSION['admin'])){
    echo json_encode([
        "success" => false,
        "message" => "Niste prijavljeni"
    ]);
    exit;
}
?>