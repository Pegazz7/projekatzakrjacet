<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "serije_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Greška pri povezivanju: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>