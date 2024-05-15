
import { db } from "../db/conexion.js";

// Obtener todas las clases
const getClases = async (req, res) => {
    try {
        const sql = `SELECT * FROM clases`;
        const result = await db.query(sql);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener clases:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener una clase por su ID
const getClaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM clases WHERE id = $1`;
        const result = await db.query(sql, [id]);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener clase por ID:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Crear una nueva clase
const postClase = async (req, res) => {
    try {
        const { nombre, horario, duracion, entrenador_id } = req.body;
        const sql = `INSERT INTO clases (nombre, horario, duracion, entrenador_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await db.query(sql, [nombre, horario, duracion, entrenador_id]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al crear clase:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export { getClases, postClase, getClaseById };
