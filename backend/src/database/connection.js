import sql from 'mssql';
import config from '../config.js';

let pool = null;

export const getConnection = async () => {
    try {
        if (pool) {
            return pool;
        }
        
        console.log('Configuración de conexión:', {
            server: config.dbConfig.server,
            database: config.dbConfig.database
        });

        pool = await sql.connect(config.dbConfig);
        console.log('Conexión exitosa a la base de datos');
        return pool;
    } catch (error) {
        console.error('Error de conexión:', error);
        throw new Error('Error al conectar con la base de datos: ' + error.message);
    }
};

export { sql };