// clientesController.js

import { db } from "../db/conexion.js";

// Obtener todos los clientes
const getClientes = async (req, res) => {
    const sql = `SELECT * FROM clientes`;
    const result = await db.query(sql);
    return res.json(result.rows);
};

// Obtener un cliente por su ID
const getclientesId = async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM clientes WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return res.json(result.rows);
};

// Crear un nuevo cliente
const postClientes = async (req, res) => {
    const { nombre, correo, edad } = req.body;
    const sql = `INSERT INTO clientes (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *`;
    const result = await db.query(sql, [nombre, edad, correo]);
    return res.json(result.rows);
};

// Actualizar un cliente por su ID
const putClientes = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, edad } = req.body;
    const sql = `UPDATE clientes SET nombre = $1, correo = $2, edad = $3 WHERE id = $4 RETURNING *`;
    const result = await db.query(sql, [nombre, correo, edad, id]);
    return res.json(result.rows);
};

// Eliminar un cliente por su ID
const deleteClientes = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id = $1 RETURNING *`;
    const result = await db.query(sql, [id]);
    return res.json(result.rows);
};

export {
    getClientes,
    postClientes,
    putClientes,
    deleteClientes, 
    getclientesId
}