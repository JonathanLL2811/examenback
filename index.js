// index.js

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pg from 'pg';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de conexión a PostgreSQL
const pool = new pg.Pool({
  connectionString: `postgresql://postgres:l0renzana@localhost:5432/postgres`
});

// Middleware para manejar JSON y CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta para el login de administradores
app.post('/api/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM administradores WHERE correo = $1', [correo]);
    const admin = result.rows[0];

    if (!admin || !bcrypt.compareSync(contraseña, admin.contraseña)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: admin.id }, 'jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Middleware para verificar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'jwt_secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Ruta protegida para crear un cliente
app.post('/api/clientes', authenticateToken, async (req, res) => {
  const { nombre, edad, correo } = req.body;

  try {
    const result = await pool.query('INSERT INTO clientes (nombre, edad, correo) VALUES ($1, $2, $3) RETURNING *', [nombre, edad, correo]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Ruta protegida para crear un entrenador
app.post('/api/entrenadores', authenticateToken, async (req, res) => {
  const { nombre, especialidad, correo } = req.body;

  try {
    const result = await pool.query('INSERT INTO entrenadores (nombre, especialidad, correo) VALUES ($1, $2, $3) RETURNING *', [nombre, especialidad, correo]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear entrenador:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Ruta protegida para crear una clase
app.post('/api/clases', authenticateToken, async (req, res) => {
  const { nombre, horario, duracion, entrenador_id } = req.body;

  try {
    const result = await pool.query('INSERT INTO clases (nombre, horario, duracion, entrenador_id) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, horario, duracion, entrenador_id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear clase:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Ruta protegida para crear una membresía
app.post('/api/membresias', authenticateToken, async (req, res) => {
  const { nombre, precio, duracion } = req.body;

  try {
    const result = await pool.query('INSERT INTO membresias (nombre, precio, duracion) VALUES ($1, $2, $3) RETURNING *', [nombre, precio, duracion]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear membresía:', error);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Más rutas para gestionar otras entidades según sea necesario...

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
