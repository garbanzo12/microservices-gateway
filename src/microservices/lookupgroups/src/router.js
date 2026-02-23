import 'reflect-metadata';
import dotenv from 'dotenv';


import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { LookupGroupsRepositoryImpl } from './infrastructure/database/typeorm/repositories/LookupGroupsRepositoryImpl.js';
import { GetTypeLookupGroups } from './application/use-cases/GetTypeLookupGroups.js';
import { GetLookupGroupsById } from './application/use-cases/GetLookupGroupsById.js';
import {LookupGroupsController} from './infrastructure/http/controllers/LookupGroupsController.js'
dotenv.config();

const router = express.Router();

let lookupGroupsController; // lazy initialization


router.use(async (req, res, next) => {
  if (!lookupGroupsController) {
    try {
        const pool = await poolPromise; 
        const repo = new LookupGroupsRepositoryImpl(pool);
        const getLookupGroupsUseCase = new GetTypeLookupGroups(repo);
        const getLookupGroupsByIdUseCase = new GetLookupGroupsById(repo);
         lookupGroupsController = new LookupGroupsController(
            getLookupGroupsUseCase,
            getLookupGroupsByIdUseCase
            );

      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de lookupgroups 
/**
 * @swagger
 * tags:
 *   name: Lookup Groups
 *   description: Grupos o categorías de lookups (tablas maestras)
 */

/**
 * @swagger
 * /lookupgroups:
 *   get:
 *     summary: Lista todos los grupos de lookup activos
 *     tags: [Lookup Groups]
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LookupGroup'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/lookupgroups', (req, res) => lookupGroupsController.getAll(req, res));

/**
 * @swagger
 * /lookupgroups/{id}:
 *   get:
 *     summary: Obtiene un grupo de lookup por ID
 *     tags: [Lookup Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Grupo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LookupGroup'
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/lookupgroups/:id', (req, res) => lookupGroupsController.getById(req, res));
export default router;