// src/main.js
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import typedocumentsRouter from './microservices/typedocuments/src/router.js';


const app = express();

app.use(express.json());              
// app.use(morgan('dev'));               

// Opcional: un endpoint de health check general
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Monta cada microservicio en su prefijo de ruta
// El prefijo puede ser '/typedocuments', '/api/typedocuments', o lo que prefieras
app.use('/', typedocumentsRouter);
// app.use('/companies', companiesRouter);
// app.use('/api', otroRouter);  // ejemplo si quieres agruparlos bajo /api

// Puerto único para todo el proyecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor unificado corriendo en http://localhost:${PORT}`);
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/typedocuments');
  // Agrega más líneas cuando montes otros microservicios
  console.log('  - Health check  → http://localhost:' + PORT + '/health');
});