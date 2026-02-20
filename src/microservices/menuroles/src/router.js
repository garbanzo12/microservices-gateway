import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { MenuRolesRepositoryImpl } from './infrastructure/database/typeorm/repositories/MenuRolesRepositoryImpl.js';
import { GetMenuRoles } from './application/use-cases/GetMenuRoles.js';
import { GetMenuRolesById } from './application/use-cases/GetMenuRolesById.js';
import {MenuRolesController} from './infrastructure/http/controllers/MenuRolesController.js'
dotenv.config();

const router = express.Router();

let menuRolesController; // lazy initialization


router.use(async (req, res, next) => {
  if (!menuRolesController) {
    try {
        const pool = await poolPromise; 

        const repo = new MenuRolesRepositoryImpl(pool);
        const getUserRolesUseCase = new GetMenuRoles(repo);
        const getUserRolesByIdUseCase = new GetMenuRolesById(repo);


      menuRolesController = new MenuRolesController(
            getUserRolesUseCase,
            getUserRolesByIdUseCase
        );
      console.log('✅ MenuRoles microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar MenuRoles:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de roles 

// ... imports y lazy initialization iguales ...

/**
 * @swagger
 * tags:
 *   name: Menu Roles
 *   description: Asignación de menús a roles
 */

/**
 * @swagger
 * /menuroles:
 *   get:
 *     summary: Obtiene todas las asignaciones de menús a roles activos
 *     tags: [Menu Roles]
 *     responses:
 *       200:
 *         description: Lista de relaciones menú-rol
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   menuId:
 *                     type: integer
 *                   roleId:
 *                     type: integer
 *                   state:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/menuroles', (req, res) => menuRolesController.getAll(req, res));

/**
 * @swagger
 * /menuroles/{id}:
 *   get:
 *     summary: Obtiene una asignación menú-rol por ID
 *     tags: [Menu Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignación encontrada
 *       404:
 *         description: Asignación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/menuroles/:id', (req, res) => menuRolesController.getById(req, res));

export default router;
