-- Active: 1715607321746@@127.0.0.1@5432@postgres@public
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    edad INTEGER,
    correo VARCHAR(100) UNIQUE
);

CREATE TABLE entrenadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    especialidad VARCHAR(100),
    correo VARCHAR(100) UNIQUE
);

CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    horario TIME,
    duracion INTERVAL,
    entrenador_id INTEGER REFERENCES entrenadores(id)
);

CREATE TABLE membresias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    precio NUMERIC(10, 2),
    duracion INTERVAL
);
