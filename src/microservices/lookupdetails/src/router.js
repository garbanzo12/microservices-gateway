import 'reflect-metadata';
import dotenv from 'dotenv';


import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { LookupDetailRepositoryImpl } from './infrastructure/database/typeorm/repositories/LookupDetailRepositoryImpl.js';
import { GetLookupDetails } from './application/use-cases/GetLookupDetails.js';
import { GetLookupDetailsById } from './application/use-cases/GetLookupDetailsById.js';
import {LookupDetailsController} from './infrastructure/http/controllers/LookupDetailsController.js'
dotenv.config();

const router = express.Router();

let lookupDetailsController; // lazy initialization


router.use(async (req, res, next) => {
  if (!lookupDetailsController) {
    try {
        const pool = await poolPromise; 

        const repo = new LookupDetailRepositoryImpl(pool);
        const getLookupDetailsUseCase = new GetLookupDetails(repo);
        const getLookupDetailsByIdUseCase = new GetLookupDetailsById(repo);
      lookupDetailsController = new LookupDetailsController(getLookupDetailsUseCase, getLookupDetailsByIdUseCase);
      console.log('✅ Lookupdetails microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Lookupdetails:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de LookupDetails 

/**
 * @swagger
 * tags:
 *   name: Lookup Details
 *   description: Valores detallados de tablas maestras (detalles de lookups)
 */

/**
 * @swagger
 * /lookupdetails:
 *   get:
 *     summary: Lista todos los detalles de lookup activos
 *     tags: [Lookup Details]
 *     responses:
 *       200:
 *         description: Lista de detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LookupDetail'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/lookupdetails', (req, res) => lookupDetailsController.getAll(req, res));

/**
 * @swagger
 * /lookupdetails/{id}:
 *   get:
 *     summary: Obtiene un detalle de lookup por ID
 *     tags: [Lookup Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LookupDetail'
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/lookupdetails/:id', (req, res) => lookupDetailsController.getById(req, res));
export default router;