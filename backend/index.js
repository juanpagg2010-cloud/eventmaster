import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './db/config.js';
import eventosRoutes from './Routes/eventostoutes.js';

const app = express();

// Configuración de CORS más explícita
app.use(cors({
  origin: '*', // Permite peticiones de cualquier origen
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));

app.use(express.json());

app.get('/', (req, res) => {    
    res.send('¡Bienvenido a la API de EventMaster!');
});

// UTILIZAMOS LAS RUTAS DE EVENTOS
app.use('/api/eventos', eventosRoutes);

const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
};

startServer();