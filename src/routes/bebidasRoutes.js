/**
 * bebidasRoutes.js — Define las rutas del recurso "bebidas"
 * y las conecta con las funciones del controlador.
 */
const express = require("express");
const router = express.Router();
const controlador = require("../controllers/bebidasController");

// CRUD completo (los 4 verbos HTTP)
router.get("/", controlador.listarBebidas); // GET    /api/bebidas
router.get("/:id", controlador.obtenerBebida); // GET    /api/bebidas/:id
router.post("/", controlador.crearBebida); // POST   /api/bebidas
router.put("/:id", controlador.actualizarBebida); // PUT    /api/bebidas/:id
router.delete("/:id", controlador.eliminarBebida); // DELETE /api/bebidas/:id

module.exports = router;
