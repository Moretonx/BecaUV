import { app, PORT } from './server.js';

try {
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
}