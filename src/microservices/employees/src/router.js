import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { EmployeeRepositoryImpl } from './infrastructure/database/typeorm/repositories/EmployeeRepositoryImpl.js';
import { GetEmployees } from './application/use-cases/GetEmployees.js';
import { GetEmployeeById } from './application/use-cases/GetEmployeeById.js';
import { CreateEmployees } from './application/use-cases/CreateEmployees.js';
import {EmployeeController} from './infrastructure/http/controllers/EmployeeController.js'
dotenv.config();

const router = express.Router();

let employeeController; // lazy initialization


router.use(async (req, res, next) => {
  if (!employeeController) {
    try {
        const pool = await poolPromise; 

        const repo = new EmployeeRepositoryImpl(pool);
        const getEmployeeUseCase = new GetEmployees(repo);
        const getEmployeeByIdUseCase = new GetEmployeeById(repo);
        const createEmployees = new CreateEmployees(repo);


      employeeController = new EmployeeController(
            getEmployeeUseCase,
            getEmployeeByIdUseCase,
            createEmployees
        );
      console.log('✅ Employees microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Employees:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de employees 



/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Empleados del sistema
 */

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Lista todos los empleados activos
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/employee', (req, res) => employeeController.getAll(req, res));

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/employee/:id', (req, res) => employeeController.getById(req, res));



/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Crea un nuevo Empleado
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [DocumentNumber, FullName]
 *             properties:
 *               DocumentNumber: { type: string, example: "13493543" }
 *               FullName:     { type: string, example: "Joe Doe" }
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employees'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error servidor
 */
router.post('/employee', (req, res) => employeeController.create(req, res));

export default router;