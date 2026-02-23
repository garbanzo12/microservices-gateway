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
 *   name: TypeDocuments
 *   description: Tipos de documentos requeridos / categorías documentales
 */

/**
 * @swagger
 * /typedocuments:
 *   get:
 *     summary: Lista todos los tipos de documentos activos
 *     tags: [TypeDocuments]
 *     responses:
 *       200:
 *         description: Lista de tipos de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TypeDocument'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/typedocuments', (req, res) => typeDocumentController.getAll(req, res));

/**
 * @swagger
 * /typedocuments/{id}:
 *   get:
 *     summary: Obtiene un tipo de documento por ID
 *     tags: [TypeDocuments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypeDocument'
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/typedocuments/:id', (req, res) => typeDocumentController.getById(req, res));
export default router;