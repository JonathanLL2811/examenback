// index.js
import express from 'express';
const app = express();
import cliente  from './routes/clientesRoute.js';

// Middleware para el manejo de datos JSON
app.use(express.json());

// Ruta principal
app.use('/', (req, res) => {
    res.send('Bienvenido a la aplicación de gestión de clientes');
});

// Rutas para clientes
app.use('/clientes', cliente);
app.post('/clientes', cliente);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
