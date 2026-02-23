// src/main.js
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi  from 'swagger-ui-express';
import { specs } from './swagger/swagger.js';   // ajusta la ruta
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
import menusRouter from './microservices/menus/src/router.js';
import rolesRouter from './microservices/roles/src/router.js';
import documentPermissionsRouter from './microservices/documentpermissions/src/router.js';
import UserRolesRouter from './microservices/userroles/src/router.js';
import MenuRolesRouter from './microservices/menuroles/src/router.js';

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
app.use('/', menusRouter);
app.use('/', rolesRouter);
app.use('/', documentPermissionsRouter);
app.use('/', UserRolesRouter);
app.use('/', MenuRolesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/menus');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/roles');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/documentpermissions');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/userroles');
  console.log('  - TypeDocuments → http://localhost:' + PORT + '/menuroles');
  // Agrega más líneas cuando montes otros microservicios
  console.log('  - Health check  → http://localhost:' + PORT + '/health');
  console.log('  - Api-docs check  → http://localhost:' + PORT + '/api-docs');
});