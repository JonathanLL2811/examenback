
import express from 'express';
const router = express.Router();
import { getClases, postClase, getClaseById } from '../controllers/clasesController.js';

// Obtener todas las clases
router.get('/', getClases);

// Obtener una clase por su ID
router.get('/:id', getClaseById);

// Crear una nueva clase
router.post('/', postClase);

export default router;
