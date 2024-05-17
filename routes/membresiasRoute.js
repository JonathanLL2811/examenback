import express from 'express';
const router = express.Router();
import { getMembresias, postMembresia } from '../controllers/membresiasController.js';

// Rutas para la gestión de membresías


router.get('/', getMembresias);


router.post('/', postMembresia);

export default router;
