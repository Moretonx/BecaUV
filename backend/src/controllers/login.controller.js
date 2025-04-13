import { getConnection, sql } from '../database/connection.js';
import { hashPassword, verifyPassword } from '../middlewares/hash';
import { createToken } from '../middlewares/auth.js';

// Login de usuario
export const loginUsuario = async (req, res) => {
    try {
        //console.log('Recibiendo solicitud de login:', req.body);
        let isMatch = false;
        const { usuario, password } = req.body;
        // Validación básica
        if (!usuario || !password) {
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            });
        }
        const pool = await getConnection();
        const result = await pool.request()
            .input('usuario', sql.VarChar, usuario)
            .query('SELECT * FROM users WHERE usuario = @usuario');
        //console.log('Resultado de la consulta:', result);
        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        const user = result.recordset[0];
        isMatch = await verifyPassword(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }
        // Generar token JWT
        const token = await createToken(result);
        res.json({
            success: true,
            message: 'Login exitoso',
            usuario: user,
            token: token  // Enviar el token
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Ver usuarios (administrador)
export const verUsuarios = async (req, res) => {
   try {
       const pool = await getConnection();
       const result = await pool.request().query('SELECT * FROM users WHERE userID != 1;');

       res.json(result.recordset);
   } catch (error) {
       console.error('Error al obtener usuarios:', error);
       res.status(500).json({
           success: false,
           message: 'Error interno al obtener usuarios',
           error: error.message
       });
   }
};

// Ver un usuario específico por ID
export const verUsuarioId = async (req, res) => {
   const { id } = req.params;

   try {
       const pool = await getConnection();
       const result = await pool.request()
           .input('id', id)
           .query('SELECT id, usuario, casino FROM alumnos WHERE id = @id');

       res.json(result.recordset[0]);
   } catch (error) {
       console.error('Error al obtener usuario por ID:', error);
       res.status(500).json({
           success: false,
           message: 'Error interno al obtener usuario',
           error: error.message
       });
   }
};

// Agregar nuevo usuario
export const agregarUsuario = async (req, res) => {
   let { usuario, password, role, casino } = req.body;

   // Validación de campos
   if (!usuario || !password || !role || !casino) {
       return res.status(400).json({
           success: false,
           message: 'Usuario, contraseña, rol y casino son requeridos'
       });
   }

   try {
       // Si quieres deshabilitar el hashing para desarrollo, comenta esta línea
       password = await hashPassword(password);

       const pool = await getConnection();
       await pool.request()
           .input("usuario", sql.VarChar, usuario)
           .input("password", sql.VarChar, password)
           .input("role", sql.VarChar, role)
           .input("casino", sql.VarChar, casino)
           .query('INSERT INTO users (usuario, password, role, casino) VALUES (@usuario, @password, @role, @casino)');

       res.status(201).json({
           success: true,
           message: 'Usuario creado con éxito',
       });
   } catch (error) {
       console.error('Error al crear usuario:', error);
       res.status(500).json({
           success: false,
           message: 'Error al crear usuario',
           error: error.message
       });
   }
};

// Borrar usuario - CORREGIDO
export const borrarUsuario = async (req, res) => {
    const { id } = req.params;
    const idParsed = parseInt(id);
    if (isNaN(idParsed)) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un número válido',
        });
}
 
    try {
        //console.log('Intentando borrar usuario con ID:', id);
        
        // Verificar si el ID es válido
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de usuario no proporcionado'
            });
        }
        
        const pool = await getConnection();
        
        // Usamos 'id' en lugar de 'userID'
        const result = await pool.request()
            .input('id', sql.Int, idParsed) // Usar sql.Int porque id es numérico según la tabla
            .query('DELETE FROM users WHERE userID = @id');
            
        //console.log('Resultado de borrado:', result);
        
        // Verificar si se eliminó alguna fila
        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            res.json({
                success: true,
                message: 'Usuario eliminado con éxito',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Usuario no encontrado o ya fue eliminado',
            });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
 };