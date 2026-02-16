// src/main.js
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import typedocumentsRouter from './microservices/typedocuments/src/router.js';
import employeeRouter from './microservices/employees/src/router.js';


const app = express();

app.use(express.json());              
// app.use(morgan('dev'));               

// endpoint de health check general
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/', typedocumentsRouter);
app.use('/', employeeRouter);

// Puerto único para todo el proyecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor unificado corriendo en http://localhost:${PORT}`);
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/typedocuments');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/employee');
  // Agrega más líneas cuando montes otros microservicios
  console.log('  - Health check  → http://localhost:' + PORT + '/health');
});