import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { EmployeeSupportRepositoryImpl } from './infrastructure/database/typeorm/repositories/EmployeeSupportRepositoryImpl.js';
import { GetEmployeeSupports } from './application/use-cases/GetEmployeeSupports.js';
import { GetEmployeeSupportsById } from './application/use-cases/GetEmployeeSupportsById.js';
import {EmployeeSupportsController} from './infrastructure/http/controllers/EmployeeSupportsController.js'
dotenv.config();

const router = express.Router();

let employeeSupportsController; // lazy initialization


router.use(async (req, res, next) => {
  if (!employeeSupportsController) {
    try {
        const pool = await poolPromise; 
        const repo = new EmployeeSupportRepositoryImpl(pool);
        const getEmployeeSupportsUseCase = new GetEmployeeSupports(repo);
        const getEmployeeSupportsByIdUseCase = new GetEmployeeSupportsById(repo);
      employeeSupportsController = new EmployeeSupportsController(getEmployeeSupportsUseCase, getEmployeeSupportsByIdUseCase);
      console.log('✅ ESupports microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});
//Endpoints de employeesupport 
// ... imports y lazy init iguales ...

/**
 * @swagger
 * tags:
 *   name: Employee Supports
 *   description: Soporte o ayudas para empleados
 */

/**
 * @swagger
 * /employeesupport:
 *   get:
 *     summary: Obtiene todos los registros de soporte para empleados
 *     tags: [Employee Supports]
 *     responses:
 *       200:
 *         description: Lista de soportes
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
 *                   state:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/employeesupport', (req, res) => employeeSupportsController.getAll(req, res));

/**
 * @swagger
 * /employeesupport/{id}:
 *   get:
 *     summary: Obtiene un soporte de empleado por ID
 *     tags: [Employee Supports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1 
 *     responses:
 *       200:
 *         description: Soporte encontrado
 *       404:
 *         description: Soporte no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/employeesupport/:id', (req, res) => employeeSupportsController.getById(req, res));

export default router;