/**
 * bebidasController.js — Lógica CRUD del recurso "bebidas".
 *
 * Cada función maneja un verbo HTTP y usa:
 *  - async/await con el pool de conexiones.
 *  - prepared statements (?) para prevenir inyección SQL.
 *  - try/catch con códigos de estado HTTP apropiados.
 */
const pool = require("../config/db");

// GET /api/bebidas  → listar todas las bebidas (200)
const listarBebidas = async (req, res) => {
  try {
    const [filas] = await pool.query("SELECT * FROM bebidas ORDER BY id");
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las bebidas." });
  }
};

// GET /api/bebidas/:id  → obtener una bebida por ID (200 / 404)
const obtenerBebida = async (req, res) => {
  try {
    const { id } = req.params;
    const [filas] = await pool.query("SELECT * FROM bebidas WHERE id = ?", [id]);
    if (filas.length === 0) {
      return res.status(404).json({ error: `No existe la bebida con ID ${id}.` });
    }
    res.status(200).json(filas[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la bebida." });
  }
};

// POST /api/bebidas  → crear una bebida (201 / 400)
const crearBebida = async (req, res) => {
  try {
    const { nombre, tamano, precio, disponible } = req.body;

    // Validación básica de entrada
    if (!nombre || precio === undefined) {
      return res
        .status(400)
        .json({ error: "Los campos 'nombre' y 'precio' son obligatorios." });
    }
    if (isNaN(precio) || Number(precio) < 0) {
      return res.status(400).json({ error: "El precio debe ser un número ≥ 0." });
    }

    const [resultado] = await pool.query(
      "INSERT INTO bebidas (nombre, tamano, precio, disponible) VALUES (?, ?, ?, ?)",
      [nombre, tamano || "mediano", precio, disponible ?? true]
    );

    res.status(201).json({
      mensaje: "Bebida creada correctamente.",
      id: resultado.insertId,
      bebida: { id: resultado.insertId, nombre, tamano: tamano || "mediano", precio, disponible: disponible ?? true },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la bebida." });
  }
};

// PUT /api/bebidas/:id  → actualizar una bebida (200 / 404 / 400)
const actualizarBebida = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tamano, precio, disponible } = req.body;

    if (!nombre || precio === undefined) {
      return res
        .status(400)
        .json({ error: "Los campos 'nombre' y 'precio' son obligatorios." });
    }

    const [resultado] = await pool.query(
      "UPDATE bebidas SET nombre = ?, tamano = ?, precio = ?, disponible = ? WHERE id = ?",
      [nombre, tamano || "mediano", precio, disponible ?? true, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: `No existe la bebida con ID ${id}.` });
    }
    res.status(200).json({ mensaje: "Bebida actualizada correctamente.", id });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la bebida." });
  }
};

// DELETE /api/bebidas/:id  → eliminar una bebida (200 / 404)
const eliminarBebida = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query("DELETE FROM bebidas WHERE id = ?", [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: `No existe la bebida con ID ${id}.` });
    }
    res.status(200).json({ mensaje: `Bebida con ID ${id} eliminada correctamente.` });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la bebida." });
  }
};

module.exports = {
  listarBebidas,
  obtenerBebida,
  crearBebida,
  actualizarBebida,
  eliminarBebida,
};
