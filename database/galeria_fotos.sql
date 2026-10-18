
CREATE DATABASE IF NOT EXISTS galeria_fotos
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE galeria_fotos;

CREATE TABLE IF NOT EXISTS fotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    ruta VARCHAR(500) NOT NULL,
    tipo VARCHAR(100),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

