
import express from 'express';
const app = express();
import cliente from './routes/clientesRoute.js';
import entrenadoresRoute from './routes/entrenadoresRoute.js';
import membresia from './routes/membresiasRoute.js';
import clases from './routes/clasesRoute.js';


app.use(express.json());


app.use('/clientes', cliente);
app.use('/entrenadores', entrenadoresRoute);
app.use('/membresias', membresia);
app.use('/clases', clases);


app.use('/', (req, res, next) => {
   
    res.send('Bienvenido a la aplicación de gestión de clientes');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
