// index.js
import express from 'express';
const app = express();
import cliente from './routes/clientesRoute.js';
import entrenadoresRoute from './routes/entrenadoresRoute.js';
import membresia from './routes/membresiasRoute.js';

// Middleware para el manejo de datos JSON
app.use(express.json());

// Rutas para clientes
app.use('/clientes', cliente);
app.use('/entrenadores', entrenadoresRoute); // Usa las rutas de entrenadores
app.use('/membresias', membresia);

// Ruta principal - Redirige todas las solicitudes a las rutas de clientes
app.use('/', (req, res, next) => {
    // Puedes personalizar el mensaje de bienvenida o redirigirlo a otra ruta si lo deseas
    res.send('Bienvenido a la aplicación de gestión de clientes');
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
