/**
 * config/db.js — Pool de conexiones a MySQL con mysql2/promise.
 *
 * Usa un POOL (no una sola conexión) para reutilizar conexiones y
 * soportar varias peticiones en paralelo. Las credenciales vienen de
 * variables de entorno (.env) — nunca se escriben a mano en el código.
 */
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "db_lab10",
  waitForConnections: true,
  connectionLimit: 10, // máximo 10 conexiones simultáneas en el pool
  queueLimit: 0,
});

// Comprobación opcional de conexión al arrancar
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Conectado a MySQL (db_lab10)");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Error al conectar con MySQL:", err.message);
  });

module.exports = pool;
