
import express from 'express';
const router = express.Router();
import { getClases, postClase, getClaseById } from '../controllers/clasesController.js';


router.get('/', getClases);


router.get('/:id', getClaseById);


router.post('/', postClase);

export default router;
