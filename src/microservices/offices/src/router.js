import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { OfficesRepositoryImpl } from './infrastructure/database/typeorm/repositories/OfficesRepositoryImpl.js';
import { GetOffices } from './application/use-cases/GetOffices.js';
import { GetOfficesById } from './application/use-cases/GetOfficesById.js';
import {OfficesController} from './infrastructure/http/controllers/OfficesController.js'
dotenv.config();

const router = express.Router();

let officesController; // lazy initialization


router.use(async (req, res, next) => {
  if (!officesController) {
    try {
        const pool = await poolPromise; 

        const repo = new OfficesRepositoryImpl(pool);
        const getOfficesUseCase = new GetOffices(repo);
        const getOfficesByIdUseCase = new GetOfficesById(repo);


      officesController = new OfficesController(
            getOfficesUseCase,
            getOfficesByIdUseCase
        );
      console.log('✅ Offices microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Offices:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de Offices 

// ... imports y lazy initialization iguales ...

/**
 * @swagger
 * tags:
 *   name: Offices
 *   description: Oficinas o sedes de la organización
 */

/**
 * @swagger
 * /offices:
 *   get:
 *     summary: Obtiene todas las oficinas activas
 *     tags: [Offices]
 *     responses:
 *       200:
 *         description: Lista de oficinas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                     example: "Sede Principal Bogotá"
 *                   address:
 *                     type: string
 *                   state:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/offices', (req, res) => officesController.getAll(req, res));

/**
 * @swagger
 * /offices/{id}:
 *   get:
 *     summary: Obtiene una oficina por su ID
 *     tags: [Offices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oficina encontrada
 *       404:
 *         description: Oficina no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/offices/:id', (req, res) => officesController.getById(req, res));

export default router;