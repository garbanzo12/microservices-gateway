import 'reflect-metadata';
import dotenv from 'dotenv';


import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { LookupDetailRepositoryImpl } from './infrastructure/database/typeorm/repositories/LookupDetailRepositoryImpl.js';
import { GetLookupDetails } from './application/use-cases/GetLookupDetails.js';
import { GetLookupDetailsById } from './application/use-cases/GetLookupDetailsById.js';
import {LookupDetailsController} from './infrastructure/http/controllers/LookupDetailsController.js'
dotenv.config();

const router = express.Router();

let lookupDetailsController; // lazy initialization


router.use(async (req, res, next) => {
  if (!lookupDetailsController) {
    try {
        const pool = await poolPromise; 

        const repo = new LookupDetailRepositoryImpl(pool);
        const getLookupDetailsUseCase = new GetLookupDetails(repo);
        const getLookupDetailsByIdUseCase = new GetLookupDetailsById(repo);
      lookupDetailsController = new LookupDetailsController(getLookupDetailsUseCase, getLookupDetailsByIdUseCase);
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de companies 
router.get('/lookupdetails', (req, res) => lookupDetailsController.getAll(req, res));
router.get('/lookupdetails/:id', (req, res) => lookupDetailsController.getById(req, res));
export default router;
