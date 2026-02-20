// src/microservicios/typedocuments/router.js
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';

import poolPromise from '../../../shared/database/mssql-pool.js';
import { TypeDocumentRepositoryImpl } from './infrastructure/database/typeorm/repositories/TypeDocumentRepositoryImpl.js';
import { GetTypeDocuments } from './application/use-cases/GetTypeDocuments.js';
import { GetTypeDocumentsById } from './application/use-cases/GetTypeDocumentsById.js';
import { TypeDocumentController } from './infrastructure/http/controllers/TypeDocumentController.js';

dotenv.config();

const router = express.Router();

let typeDocumentController; // lazy initialization

router.use(async (req, res, next) => {
  if (!typeDocumentController) {
    try {
      const pool = await poolPromise; 

      const repo = new TypeDocumentRepositoryImpl(pool);
      const getTypeDocumentsUseCase = new GetTypeDocuments(repo);
      const getTypeDocumentsByIdUseCase = new GetTypeDocumentsById(repo);

      typeDocumentController = new TypeDocumentController(
        getTypeDocumentsUseCase,
        getTypeDocumentsByIdUseCase
      );
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

/**
 * @swagger
 * tags:
 *   name: Tipos de Documento
 *   description: Operaciones relacionadas con los tipos de documento
 */

/**
 * @swagger
 * /typedocuments:
 *   get:
 *     summary: Obtiene todos los tipos de documento activos
 *     tags: [Tipos de Documento]
 *     responses:
 *       200:
 *         description: Lista de tipos de documento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Cédula de Ciudadanía
 *                   state:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/typedocuments', (req, res) => typeDocumentController.getAll(req, res));

/**
 * @swagger
 * /typedocuments/{id}:
 *   get:
 *     summary: Obtiene un tipo de documento por su ID
 *     tags: [Tipos de Documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 state:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/typedocuments/:id', (req, res) => typeDocumentController.getById(req, res));

export default router;