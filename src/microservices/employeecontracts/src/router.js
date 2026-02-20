import 'reflect-metadata';
import dotenv from 'dotenv';


import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { eContractRepositoryImpl } from './infrastructure/database/typeorm/repositories/eContractRepositoryImpl.js';
import { GeteContracts } from './application/use-cases/GeteContracts.js';
import { GeteContractsById } from './application/use-cases/GeteContractById.js';
import {eContractController} from './infrastructure/http/controllers/eContractController.js'
dotenv.config();

const router = express.Router();

let econtractController; // lazy initialization

router.use(async (req, res, next) => {
  if (!econtractController) {
    try {
        const pool = await poolPromise; // Conexion a la pool mssql  

        const repo = new eContractRepositoryImpl(pool);
        const geteContractsUseCase = new GeteContracts(repo);
        const geteContractsByIdUseCase = new GeteContractsById(repo);
      econtractController = new eContractController(
        geteContractsUseCase,
        geteContractsByIdUseCase
      );
      console.log('✅ EployeContracts microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

// ... imports y lazy init iguales ...

/**
 * @swagger
 * tags:
 *   name: Employee Contracts
 *   description: Tipos o contratos de empleados
 */

/**
 * @swagger
 * /eContract:
 *   get:
 *     summary: Obtiene todos los contratos de empleados activos
 *     tags: [Employee Contracts]
 *     responses:
 *       200:
 *         description: Lista de contratos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example : 1
 *                   name:
 *                     type: string
 *                     example: "1"
 *                   state:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eContract', (req, res) => econtractController.getAll(req, res));

/**
 * @swagger
 * /eContract/{id}:
 *   get:
 *     summary: Obtiene un contrato de empleado por ID
 *     tags: [Employee Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contrato encontrado
 *       404:
 *         description: Contrato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eContract/:id', (req, res) => econtractController.getById(req, res));

export default router;
