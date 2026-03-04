import 'reflect-metadata';
import dotenv from 'dotenv';


import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { eContractRepositoryImpl } from './infrastructure/database/typeorm/repositories/eContractRepositoryImpl.js';
import { GeteContracts } from './application/use-cases/GeteContracts.js';
import { GeteContractsById } from './application/use-cases/GeteContractById.js';
import { CreateContract } from './application/use-cases/CreateContract.js';
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
        const createContract = new CreateContract(repo);
      econtractController = new eContractController(
        geteContractsUseCase,
        geteContractsByIdUseCase,
        createContract
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
 *   description: Contratos laborales de empleados
 */

/**
 * @swagger
 * /eContract:
 *   get:
 *     summary: Lista todos los contratos de empleados activos
 *     tags: [Employee Contracts]
 *     responses:
 *       200:
 *         description: Lista de contratos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeContract'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eContract', (req, res) => econtractController.getAll(req, res));

/**
 * @swagger
 * /eContract/{id}:
 *   get:
 *     summary: Obtiene un contrato por ID
 *     tags: [Employee Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Contrato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeContract'
 *       404:
 *         description: Contrato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eContract/:id', (req, res) => econtractController.getById(req, res));


/**
 * @swagger
 * /eContract:
 *   post:
 *     summary: Crea un nuevo contrato laboral
 *     tags: [Employee Contracts]              
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdEmployee
 *               - ContractStartDate
 *               - TypeOfContract
 *             properties:
 *               IdEmployee:
 *                 type: integer
 *                 example: 1
 *                 description: ID del empleado
 *               ContractStartDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-01"
 *                 description: Fecha de inicio del contrato
 *               ContractEndDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-31"
 *                 nullable: true
 *                 description: Fecha de finalización (opcional para indefinidos)
 *               IdCecoName:
 *                 type: integer
 *                 example: 172
 *                 nullable: true
 *               TypeOfContract:
 *                 type: integer
 *                 example: 252
 *               CreatedBy:
 *                 type: integer
 *                 example: 3
 *                 description: ID del usuario que crea el registro
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeContract'   # ← usa el mismo nombre que en GET
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/eContract', (req, res) => econtractController.create(req, res));
export default router;
