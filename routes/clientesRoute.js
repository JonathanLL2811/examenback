// clientesRoute.js

import express  from 'express';
const cliente = express();
import{
    getClientes,
    postClientes,
    putClientes,
    deleteClientes, getclientesId} from '../controllers/clientesController.js';
 
// Rutas para la gestión de clientes

// Obtener todos los clientes
cliente.get('/', getClientes);

// Obtener un cliente por su ID
cliente.get('/:id', getclientesId);

// Crear un nuevo cliente
cliente.post('/', postClientes);

// Actualizar un cliente por su ID
cliente.put('/:id', putClientes);

// Eliminar un cliente por su ID
cliente.delete('/:id', deleteClientes);

export default
    cliente
