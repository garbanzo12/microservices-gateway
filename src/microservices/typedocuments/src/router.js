// src/microservicios/typedocuments/router.js
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';

import poolPromise from '../../../shared/database/mssql-pool.js';
import { TypeDocumentRepositoryImpl } from './infrastructure/database/typeorm/repositories/TypeDocumentRepositoryImpl.js';
import { GetTypeDocuments } from './application/use-cases/GetTypeDocuments.js';
import { GetTypeDocumentsById } from './application/use-cases/GetTypeDocumentsById.js';
import { TypeDocumentController } from './infrastructure/http/controllers/TypeDocumentController.js';

dotenv.config();

const router = express.Router();


let typeDocumentController; // lazy initialization

router.use(async (req, res, next) => {
  if (!typeDocumentController) {
    try {
      const pool = await poolPromise; 

      const repo = new TypeDocumentRepositoryImpl(pool);
      const getTypeDocumentsUseCase = new GetTypeDocuments(repo);
      const getTypeDocumentsByIdUseCase = new GetTypeDocumentsById(repo);

      typeDocumentController = new TypeDocumentController(
        getTypeDocumentsUseCase,
        getTypeDocumentsByIdUseCase
      );

      console.log('✅ TypeDocuments microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar TypeDocuments:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});

//Endpoints de typedocuments 
router.get('/typedocuments', (req, res) => typeDocumentController.getAll(req, res));
router.get('/typedocuments/:id', (req, res) => typeDocumentController.getById(req, res));



export default router;