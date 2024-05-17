import { db } from "../db/conexion.js";


const getEntrenadores = async (req, res) => {
    try {
        const sql = `SELECT * FROM entrenadores`;
        const result = await db.query(sql);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener entrenadores:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


const postEntrenador = async (req, res) => {
    try {
        const { nombre, especialidad, correo } = req.body;
        const sql = `INSERT INTO entrenadores (nombre, especialidad, correo) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(sql, [nombre, especialidad, correo]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al crear entrenador:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export { getEntrenadores, postEntrenador };
