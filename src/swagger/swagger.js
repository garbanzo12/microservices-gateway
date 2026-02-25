// src/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicios API - Documentación',
      version: '1.0.0',
      description: 'Documentación de los endpoints de los microservicios',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desarrollo local' },
    ],
  },
  apis: [
    path.join(__dirname, '../microservices/*/src/router.js').replace(/\\/g, '/'),
  ],
};

console.log('Swagger buscando en las siguientes rutas:');
options.apis.forEach(route => console.log('  → ' + route));

export const specs = swaggerJsdoc(options);