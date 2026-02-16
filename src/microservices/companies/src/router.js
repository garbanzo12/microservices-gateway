import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { CompanyRepositoryImpl } from './infrastructure/database/typeorm/repositories/CompanyRepositoryImpl.js';
import { GetCompanies } from './application/use-cases/GetCompanies.js';
import { GetCompaniesById } from './application/use-cases/GetCompanyById.js';
import {CompanyController} from './infrastructure/http/controllers/CompanyController.js'
dotenv.config();

const router = express.Router();

let companyController; // lazy initialization

router.use(async (req, res, next) => {
  if (!companyController) {
    try {
        const pool = await poolPromise; 
        const repo = new CompanyRepositoryImpl(pool);
        const getCompaniesUseCase = new GetCompanies(repo);
        const getCompaniesByIdUseCase = new GetCompaniesById(repo);
      companyController = new CompanyController(
         getCompaniesUseCase,
         getCompaniesByIdUseCase
     );

//Endpoints de companies 
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de companies 

router.get('/companies', (req, res) => companyController.getAll(req, res));
router.get('/companies/:id', (req, res) => companyController.getById(req, res));
export default router;
