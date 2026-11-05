/**
 * index.js — Punto de entrada del servidor Express.
 * Configura middlewares, monta las rutas y arranca el servidor.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bebidasRoutes = require("./routes/bebidasRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors()); // habilita peticiones de otros orígenes
app.use(express.json()); // parsea el body JSON de las peticiones

// --- Ruta raíz de bienvenida ---
app.get("/", (req, res) => {
  res.json({
    mensaje: "☕ API de Cafetería - Semana 10",
    endpoints: {
      listar: "GET /api/bebidas",
      obtener: "GET /api/bebidas/:id",
      crear: "POST /api/bebidas",
      actualizar: "PUT /api/bebidas/:id",
      eliminar: "DELETE /api/bebidas/:id",
    },
  });
});

// --- Rutas del recurso bebidas ---
app.use("/api/bebidas", bebidasRoutes);

// --- Middleware 404 (ruta no encontrada) ---
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// --- Arranque del servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
