import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { CecoNameRepositoryImpl } from './infrastructure/database/typeorm/repositories/CecoNameRepositoryImpl.js';
import { GetCecoNames } from './application/use-cases/GetCecoNames.js';
import { GetCecoNameById } from './application/use-cases/GetCecoNameById.js';
import { CreateCecoName } from './application/use-cases/CreateCecoName.js';
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
const createCecoNameUseCase = new CreateCecoName(repo);
 CecoameController = new CecoNameController(getCecoNameUseCase, getCecoNameByIdUseCase,createCecoNameUseCase);
      console.log('✅ Ceconame microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de ceconame 

/**
 * @swagger
 * tags:
 *   name: CecoName
 *   description: Centros de costo (CecoName)
 */

/**
 * @swagger
 * /ceconame:
 *   get:
 *     summary: Lista todos los centros de costo activos
 *     tags: [CecoName]
 *     responses:
 *       200:
 *         description: Lista de centros de costo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CecoName'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ceconame', (req, res) => CecoameController.getAll(req, res));

/**
 * @swagger
 * /ceconame/{id}:
 *   get:
 *     summary: Obtiene un centro de costo por ID
 *     tags: [CecoName]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Centro de costo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CecoName'
 *       404:
 *         description: Centro de costo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ceconame/:id', (req, res) => CecoameController.getById(req, res));


/**
 * @swagger
 * /ceconame:
 *   post:
 *     summary: Crea un nuevo centro de costo (CecoName)
 *     description: Registra un nuevo registro en la tabla dbo.CecoName.  
 *                  Requiere Cecocode y Name obligatorios. State por defecto es activo (true/1).
 *     tags: [CecoName]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Cecocode
 *               - Name
 *             properties:
 *               Cecocode:
 *                 type: string
 *                 description: Código único del centro de costo (máx. 50 caracteres)
 *                 example: "CC-BOG-005"
 *               Name:
 *                 type: string
 *                 description: Nombre descriptivo del centro de costo
 *                 example: "Dirección Comercial Bogotá Sur"
 *               State:
 *                 type: boolean
 *                 description: Estado del registro (true = activo, false = inactivo)
 *                 default: true
 *                 example: true
 *               CreatedBy:
 *                 type: integer
 *                 nullable: true
 *                 description: ID del usuario que crea el registro (opcional)
 *                 example: 3
 *     responses:
 *       201:
 *         description: Centro de costo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CecoName'
 *             example:
 *               Id: 45
 *               Cecocode: "CC-BOG-005"
 *               Name: "Dirección Comercial Bogotá Sur"
 *               State: true
 *               CreatedBy: 3
 *               CreatedAt: "2026-02-24T15:45:12.340Z"
 *               UpdatedBy: null
 *               UpdateAt: null
 *       400:
 *         description: Datos inválidos o faltantes (Cecocode o Name requeridos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Cecocode es requerido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el CecoName"
 */
router.post('/ceconame', (req, res) => CecoameController.Create(req, res));
export default router;
