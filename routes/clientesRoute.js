import express from 'express';
const cliente = express();
import { getClientes, postClientes, putClientes, deleteClientes, getClientesId } from '../controllers/clientesController.js';


// Rutas para la gestión de clientes


cliente.get('/', getClientes);


cliente.get('/:id', getClientesId);


cliente.post('/', postClientes);


cliente.put('/:id', putClientes);


cliente.delete('/:id', deleteClientes);

export default cliente;
