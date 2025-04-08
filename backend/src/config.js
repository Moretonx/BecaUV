import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT || 4000,
    dbConfig: {
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD || 'TuPasswordSeguro123',
        server: process.env.DB_SERVER || 'sqlserver', // Nombre del servicio en docker-compose
        database: process.env.DB_DATABASE || 'becas_uv',
        // config.js
        apikey: 'BecasUVSecretKey',  // Esta es tu clave secreta
        options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            instanceName: process.env.DB_INSTANCE
        },
        port: 1433 // Puerto por defecto de SQL Server
    }
};