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


/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Operaciones relacionadas con las compañías/empresas
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene todas las compañías activas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de compañías
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
 *                   name:
 *                     type: string
 *                     example: "Empresa XYZ S.A."
 *                   state:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/companies', (req, res) => companyController.getAll(req, res));

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Obtiene una compañía por su ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compañía
 *     responses:
 *       200:
 *         description: Compañía encontrada
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/companies/:id', (req, res) => companyController.getById(req, res));

export default router;