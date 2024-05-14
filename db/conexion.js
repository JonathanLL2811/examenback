// conexion.js

import pg from 'pg-promise';
const pgp = pg();

import { configDotenv } from 'dotenv';

configDotenv();

const user_db= process.env.user_db;
const user_pass= process.env.user_pass;
const host= process.env.host;
const database= process.env.database;

const cnstr = `postgresql://${user_db}:${user_pass}@${host}:5432/${database}`;

const db = pgp(cnstr);

export { db }; // Asegúrate de exportar correctamente el objeto db
