// src/swagger.js   (o src/swagger/config.js)
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
    definition: {
  // ...
  components: {
    schemas: {
      GenericLookup: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          state: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Employee: {
        type: 'object',
        properties: {
          UserId: { type: 'integer' },
          Name: { type: 'string' },
          // ...
        }
      }
      // etc.
    }
  }
},
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Desarrollo local',
      },
    ],
  },

    // Ruta exacta para typedocuments (prueba esta primero)
  apis: [
    path.join(__dirname, '../src/microservices/*/src/router.js').replace(/\\/g, '/'),
  ],



};

// Para depuración: imprime las rutas que realmente está usando
console.log('Swagger está buscando documentación en:');
options.apis.forEach(p => console.log('   → ' + p));

export const specs = swaggerJsdoc(options);