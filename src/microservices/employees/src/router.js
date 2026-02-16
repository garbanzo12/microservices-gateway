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


// En router.js de typedocuments
// setTimeout(() => {
//   throw new Error('Error asíncrono fuera de ruta - debería matar el proceso');
// }, 5000);


router.get('/employee', (req, res) => employeeController.getAll(req, res));
router.get('/employee/:id', (req, res) => employeeController.getById(req, res));
export default router;
