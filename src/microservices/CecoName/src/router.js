import 'reflect-metadata';
import dotenv from 'dotenv';
import morgan from 'morgan';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { CecoNameRepositoryImpl } from './infrastructure/database/typeorm/repositories/CecoNameRepositoryImpl.js';
import { GetCecoNames } from './application/use-cases/GetCecoNames.js';
import { GetCecoNameById } from './application/use-cases/GetCecoNameById.js';
import {CecoNameController} from './infrastructure/http/controllers/CecoNameController.js'
dotenv.config();


const router = express.Router();

let CecoameController; // lazy initialization


router.use(async (req, res, next) => {
  if (!CecoameController) {
    try {
        const pool = await poolPromise; 

const repo = new CecoNameRepositoryImpl(pool);
const getCecoNameUseCase = new GetCecoNames(repo);
const getCecoNameByIdUseCase = new GetCecoNameById(repo);
 CecoameController = new CecoNameController(getCecoNameUseCase, getCecoNameByIdUseCase);
      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de ceconame 
router.get('/ceconame', (req, res) => CecoameController.getAll(req, res));
router.get('/ceconame/:id', (req, res) => CecoameController.getById(req, res));

export default router;
