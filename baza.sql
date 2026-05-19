CREATE DATABASE serije_db;

USE serije_db;

CREATE TABLE serije (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(150) NOT NULL,
    zanr VARCHAR(100) NOT NULL,
    godina INT NOT NULL,
    ocena DECIMAL(3,1) NOT NULL,
    slika TEXT
);