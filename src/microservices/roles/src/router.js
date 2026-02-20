import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { RolesRepositoryImpl } from './infrastructure/database/typeorm/repositories/RolesRepositoryImpl.js';
import { GetRoles } from './application/use-cases/GetRoles.js';
import { GetRolesById } from './application/use-cases/GetRolesById.js';
import {RolesController} from './infrastructure/http/controllers/RolesController.js'
dotenv.config();

const router = express.Router();

let rolesController; // lazy initialization


router.use(async (req, res, next) => {
  if (!rolesController) {
    try {
        const pool = await poolPromise; 

        const repo = new RolesRepositoryImpl(pool);
        const getRolesUseCase = new GetRoles(repo);
        const getRolesByIdUseCase = new GetRolesById(repo);


      rolesController = new RolesController(
            getRolesUseCase,
            getRolesByIdUseCase
        );
      console.log('✅ Roles microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Roles:', err);
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
 *   name: Roles
 *   description: Roles de usuario en el sistema
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtiene todos los roles activos
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                     example: "Administrador"
 *                   description:
 *                     type: string
 *                   state:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.get('/roles', (req, res) => rolesController.getAll(req, res));

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtiene un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/roles/:id', (req, res) => rolesController.getById(req, res));

export default router;