import express from 'express';
const router = express.Router();
import { getEntrenadores, postEntrenador } from '../controllers/entrenadoresController.js';

// Rutas para la gestión de entrenadores

// Obtener todos los entrenadores
router.get('/', getEntrenadores);

// Crear un nuevo entrenador
router.post('/', postEntrenador);

export default router;
