import { db } from "../db/conexion.js";


const getClientes = async (_req, res) => {
    try {
        const sql = `SELECT * FROM clientes`;
        console.log("Query SQL:", sql); 
        const result = await db.query(sql);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


const getClientesId = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM clientes WHERE id = $1`;
        const result = await db.query(sql, [id]);
        return res.json(result);
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




const postClientes = async (req, res) => {
    try {
        const { nombre, correo, edad } = req.body;
        const sql = `INSERT INTO clientes (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(sql, [nombre, correo, edad]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al crear cliente:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


const putClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, edad } = req.body;
        const sql = `UPDATE clientes SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *`;
        const result = await db.query(sql, [nombre, correo, edad, id]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

const deleteClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM clientes WHERE id = $1 RETURNING *`;
        const result = await db.query(sql, [id]);
        return res.json(result.rows);
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export {
    getClientes,
    postClientes,
    putClientes,
    deleteClientes,
    getClientesId
};
