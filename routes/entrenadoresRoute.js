import express from 'express';
const router = express.Router();
import { getEntrenadores, postEntrenador } from '../controllers/entrenadoresController.js';




router.get('/', getEntrenadores);


router.post('/', postEntrenador);

export default router;
