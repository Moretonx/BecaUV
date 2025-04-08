import {getConnection, sql} from '../database/connection.js'

// Peticiones Casinos
export const verCasinos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM casinos');
        
        console.log('Casinos encontrados:', result.recordset);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener casinos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener casinos',
            error: error.message
        });
    }
};
 
export const verCasinoId = async (req, res) => {
    try {
        const {id} = req.params;
     
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, parseInt(id)) // Asegúrate de que id sea un número
            .query('SELECT * FROM casinos WHERE id = @id');
     
        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Casino no encontrado'
            });
        }
        
        console.log('Casino encontrado:', result.recordset[0]);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener casino por ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener casino',
            error: error.message
        });
    }
};
 
export const agregarCasino = async (req, res) => {
    try {
        let { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del casino es requerido'
            });
        }
        
        const cantidad = 0;
     
        const pool = await getConnection();
        const result = await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("cantidad", sql.Int, cantidad)
            .query(`
                INSERT INTO casinos (nombre, cantidad) 
                VALUES (@nombre, @cantidad);
                SELECT SCOPE_IDENTITY() AS id;
            `);
            
        console.log('Casino agregado:', result);
        res.status(201).json({
            success: true,
            message: 'Casino agregado exitosamente',
            id: result.recordset[0].id
        });
    } catch (error) {
        console.error('Error al agregar casino:', error);
        res.status(500).json({
            success: false,
            message: 'Error al agregar casino',
            error: error.message
        });
    }
};
 
export const borrarCasino = async (req, res) => {
    try {
        const { id } = req.params;
     
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el ID del casino'
            });
        }
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, parseInt(id)) // Usar sql.Int para asegurarnos de que sea un número
            .query('DELETE FROM casinos WHERE id = @id');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'Casino no encontrado'
            });
        }
        
        console.log('Casino eliminado:', result);
        res.json({
            success: true,
            message: 'Casino eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar casino:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar casino',
            error: error.message
        });
    }
};
 
export const editarCasino = async (req, res) => {
    try {
        let { nombre, cantidad } = req.body;
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere el ID del casino'
            });
        }
        
        if (!nombre && cantidad === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere al menos un campo para actualizar'
            });
        }
     
        const pool = await getConnection();
        const request = pool.request().input("id", sql.Int, parseInt(id));
        
        let query = 'UPDATE casinos SET ';
        const updateParts = [];
        
        if (nombre) {
            request.input("nombre", sql.VarChar, nombre);
            updateParts.push('nombre = @nombre');
        }
        
        if (cantidad !== undefined) {
            request.input("cantidad", sql.Int, cantidad);
            updateParts.push('cantidad = @cantidad');
        }
        
        query += updateParts.join(', ') + ' WHERE id = @id';
        
        const result = await request.query(query);
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'Casino no encontrado'
            });
        }
        
        console.log('Casino actualizado:', result);
        res.json({
            success: true,
            message: 'Casino actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar casino:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar casino',
            error: error.message
        });
    }
}