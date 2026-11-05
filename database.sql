-- ============================================================
--  Base de datos de la API de Cafetería - Semana 10 (db_lab10)
--  Ejecutar en phpMyAdmin (XAMPP) o en la consola de MySQL.
-- ============================================================

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS db_lab10
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_lab10;

-- 2. Crear la tabla de bebidas
CREATE TABLE IF NOT EXISTS bebidas (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)   NOT NULL,
  tamano      ENUM('pequeno','mediano','grande') NOT NULL DEFAULT 'mediano',
  precio      DECIMAL(10,2)  NOT NULL,
  disponible  BOOLEAN        NOT NULL DEFAULT TRUE,
  creado_en   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 3. Datos de ejemplo
INSERT INTO bebidas (nombre, tamano, precio, disponible) VALUES
  ('Café Americano',     'mediano', 6.50,  TRUE),
  ('Capuccino',          'grande',  9.00,  TRUE),
  ('Latte Vainilla',     'mediano', 8.50,  TRUE),
  ('Chocolate Caliente', 'pequeno', 7.00,  TRUE),
  ('Frappé Mocha',       'grande',  12.00, FALSE);
