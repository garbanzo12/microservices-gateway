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
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});
//Endpoints de companies 
router.get('/employeesupport', (req, res) => employeeSupportsController.getAll(req, res));
router.get('/employeesupport/:id', (req, res) => employeeSupportsController.getById(req, res));

export default router;
