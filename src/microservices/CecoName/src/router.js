import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { CecoNameRepositoryImpl } from './infrastructure/database/typeorm/repositories/CecoNameRepositoryImpl.js';
import { GetCecoNames } from './application/use-cases/GetCecoNames.js';
import { GetCecoNameById } from './application/use-cases/GetCecoNameById.js';
import {CecoNameController} from './infrastructure/http/controllers/CecoNameController.js'
dotenv.config();


const router = express.Router();

let CecoameController; // lazy initialization


router.use(async (req, res, next) => {
  if (!CecoameController) {
    try {
        const pool = await poolPromise; 

const repo = new CecoNameRepositoryImpl(pool);
const getCecoNameUseCase = new GetCecoNames(repo);
const getCecoNameByIdUseCase = new GetCecoNameById(repo);
 CecoameController = new CecoNameController(getCecoNameUseCase, getCecoNameByIdUseCase);
      console.log('✅ Ceconame microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de ceconame 
// ... imports y lazy init iguales ...

/**
 * @swagger
 * tags:
 *   name: CecoName
 *   description: Operaciones relacionadas con los nombres de Centro de Costo (CecoName)
 */

/**
 * @swagger
 * /ceconame:
 *   get:
 *     summary: Obtiene todos los registros de CecoName activos
 *     tags: [CecoName]
 *     responses:
 *       200:
 *         description: Lista de CecoNames
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
 *                     example: "Ceco Principal"
 *                   state:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ceconame', (req, res) => CecoameController.getAll(req, res));

/**
 * @swagger
 * /ceconame/{id}:
 *   get:
 *     summary: Obtiene un CecoName por su ID
 *     tags: [CecoName]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del CecoName
 *     responses:
 *       200:
 *         description: CecoName encontrado
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
 *         description: CecoName no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ceconame/:id', (req, res) => CecoameController.getById(req, res));

export default router;
