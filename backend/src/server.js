import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import becasRoutes from './routes/becas.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    /* origin: 'http://frontend_becasuv:80', */
    origin: 'http://becas-informatica.uv.cl',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Rutas
app.use('/api', becasRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

export { app, PORT };