import express from 'express';
const router = express.Router();
import { getMembresias, postMembresia } from '../controllers/membresiasController.js';

// Rutas para la gestión de membresías

// Obtener todas las membresías
router.get('/', getMembresias);

// Crear una nueva membresía
router.post('/', postMembresia);

export default router;
