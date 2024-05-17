import { db } from "../db/conexion.js";


const getMembresias = async (_req, res) => {
    try {
        const sql = `SELECT * FROM membresias`;
        console.log("Query SQL:", sql); 
        const result = await db.query(sql);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener membresías:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


const postMembresia = async (req, res) => {
    try {
        const { nombre, precio, duracion } = req.body;
        const sql = `INSERT INTO membresias (nombre, precio, duracion) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(sql, [nombre, precio, duracion]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al crear membresía:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export {
    getMembresias,
    postMembresia
};
