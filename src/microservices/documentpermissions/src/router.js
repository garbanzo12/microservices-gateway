import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { GetDocumentPermissionsImpl } from './infrastructure/database/typeorm/repositories/GetDocumentPermissionsImpl.js';
import { GetDocumentPermissions } from './application/use-cases/GetDocumentPermissions.js';
import { GetDocumentPermissionsById } from './application/use-cases/GetDocumentPermissionsById.js';
import {DocumentPermissionsController} from './infrastructure/http/controllers/CompanyController.js'
dotenv.config();

const router = express.Router();

let documentPermissionsController; // lazy initialization

router.use(async (req, res, next) => {
  if (!documentPermissionsController) {
    try {
        const pool = await poolPromise; 
        const repo = new GetDocumentPermissionsImpl(pool);
        const getDocumentPermissionsUseCase = new GetDocumentPermissions(repo);
        const getDocumentPermissionsByIdUseCase = new GetDocumentPermissionsById(repo);
      documentPermissionsController = new DocumentPermissionsController(
         getDocumentPermissionsUseCase,
         getDocumentPermissionsByIdUseCase
     );

//Endpoints de documentpermissions 
      console.log('✅ DocumentPermissions microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de documentpermissions 

// ... imports y lazy init iguales ...

/**
 * @swagger
 * tags:
 *   name: Document Permissions
 *   description: Permisos sobre documentos
 */

/**
 * @swagger
 * /documentpermissions:
 *   get:
 *     summary: Obtiene todos los permisos de documentos activos
 *     tags: [Document Permissions]
 *     responses:
 *       200:
 *         description: Lista de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   typeDocumentId:
 *                     type: integer
 *                   visualize:
 *                     type: boolean
 *                   eliminate:
 *                     type: boolean
 *                   upload:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/documentpermissions', (req, res) => documentPermissionsController.getAll(req, res));

/**
 * @swagger
 * /documentpermissions/{id}:
 *   get:
 *     summary: Obtiene un permiso de documento por ID
 *     tags: [Document Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso encontrado
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/documentpermissions/:id', (req, res) => documentPermissionsController.getById(req, res));

export default router;