// src/main.js
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import typedocumentsRouter from './microservices/typedocuments/src/router.js';
import employeeRouter from './microservices/employees/src/router.js';
import companiesRouter from './microservices/companies/src/router.js';
import ceconameRouter from './microservices/CecoName/src/router.js';
import employeecontractsRouter from './microservices/employeecontracts/src/router.js';
import employeesupportsRouter from './microservices/employeesupports/src/router.js';
import lookupdetailsRouter from './microservices/lookupdetails/src/router.js';
import lookupgroupsRouter from './microservices/lookupgroups/src/router.js';
import officesRouter from './microservices/offices/src/router.js';
import usersRouter from './microservices/users/src/router.js';


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
app.use('/', companiesRouter);
app.use('/', ceconameRouter);
app.use('/', employeecontractsRouter);
app.use('/', employeesupportsRouter);
app.use('/', lookupdetailsRouter);
app.use('/', lookupgroupsRouter);
app.use('/', officesRouter);
app.use('/', usersRouter);

// 1. Manejo de errores en rutas 
app.use((err, req, res, next) => {
  console.error('Error capturado en Express:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// 2. Manejo de promesas rechazadas no capturadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 3. Manejo de excepciones no capturadas (lo más crítico)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION - intento de recuperación:', err.stack);
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor unificado corriendo en http://localhost:${PORT}`);
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/typedocuments');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/employee');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/companies');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/ceconame');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/eContract');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/employeesupport');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/lookupdetails');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/lookupgroups');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/offices');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/users');
  // Agrega más líneas cuando montes otros microservicios
  console.log('  - Health check  → http://localhost:' + PORT + '/health');
});