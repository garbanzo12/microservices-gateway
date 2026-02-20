import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { EmployeeRepositoryImpl } from './infrastructure/database/typeorm/repositories/EmployeeRepositoryImpl.js';
import { GetEmployees } from './application/use-cases/GetEmployees.js';
import { GetEmployeeById } from './application/use-cases/GetEmployeeById.js';
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


      employeeController = new EmployeeController(
            getEmployeeUseCase,
            getEmployeeByIdUseCase
        );
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de employees 



// ... imports y lazy init iguales ...

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Operaciones relacionadas con los empleados
 */

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Obtiene todos los empleados activos
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserId:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Document:
 *                     type: string
 *                   UserName:
 *                     type: string
 *                   Email:
 *                     type: string
 *                   State:
 *                     type: integer
 *                   CreatedAt:
 *                     type: string
 *                     format: date-time
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
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/employee/:id', (req, res) => employeeController.getById(req, res));

export default router;