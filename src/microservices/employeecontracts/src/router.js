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
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de companies 
router.get('/eContract', (req, res) => econtractController.getAll(req, res));
router.get('/eContract/:id', (req, res) => econtractController.getById(req, res));
export default router;

