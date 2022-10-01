import {getConnection, sql} from '../database/connection'

// Peticiones Alumnos
export const verAlumnos = async (req, res) => {
   const pool = await getConnection();
   const result = await pool.request().query('SELECT * FROM alumnos');

   res.json(result.recordset);
};

export const verAlumnoId = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   const result = await pool.request()
   .input('id', id)
   .query('SELECT * FROM alumnos WHERE id = @id')

   res.send(result.recordset[0]);
};

export const verAlumnoRut = async (req, res) => {
   const {rut} = req.params;

   const pool = await getConnection();
   const result = await pool.request()
   .input('rut', rut)
   .query('SELECT * FROM alumnos WHERE rut = @rut')

   res.send(result.recordset[0]);
};

export const agregarAlumno = async (req, res) =>{
   let { nombre, rut, cantidad, fecha} = req.body;

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("rut", sql.Int, rut)
   .input("cantidad", sql.Int, cantidad)
   .input("fecha", sql.Date, fecha)
   .query('INSERT INTO alumnos (nombre, rut, cantidad, fecha) VALUES (@nombre, @rut, @cantidad, @fecha)');
};

export const borrarAlumno = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input('id', id)
   .query('DELETE FROM alumnos WHERE id = (CAST(@id AS VARCHAR))');
};

export const editarAlumno = async (req, res) => {
   let { nombre, rut, cantidad, fecha } = req.body;
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("rut", sql.Int, rut)
   .input("cantidad", sql.Int, cantidad)
   .input("fecha", sql.Date, fecha)
   .input("id", sql.Int, id)
   .query('UPDATE alumnos SET nombre = @nombre, rut = @rut, cantidad = @cantidad, fecha = @fecha WHERE id = @id');
}
// Peticion Canje de beca
export const canjeAlumno = async (req, res) => {
   const {rut} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input("rut", sql.Int, rut)
   .query('UPDATE alumnos SET cantidad = @cantidad WHERE rut = @rut');
}


// Peticiones Casinos

export const verCasinos = async (req, res) => {
   const pool = await getConnection();
   const result = await pool.request().query('SELECT * FROM casinos');

   res.json(result.recordset);
};

export const verCasinoId = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   const result = await pool.request()
   .input('id', id)
   .query('SELECT * FROM casinos WHERE id = @id')

   res.send(result.recordset[0]);
};

export const agregarCasino = async (req, res) =>{
   let { nombre, cantidad} = req.body;

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("cantidad", sql.Int, cantidad)
   .query('INSERT INTO casinos (nombre, cantidad) VALUES (@nombre, 0)');
};

export const borrarCasino = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input('id', id)
   .query('DELETE FROM casinos WHERE id = (CAST(@id AS VARCHAR))');
};

export const editarCasino = async (req, res) => {
   let { nombre, cantidad } = req.body;
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("cantidad", sql.Int, cantidad)
   .input("id", sql.Int, id)
   .query('UPDATE casinos SET nombre = @nombre, cantidad = @cantidad WHERE id = @id');
}