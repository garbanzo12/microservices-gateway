import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { UsersRepositoryImpl } from './infrastructure/database/typeorm/repositories/UsersRepositoryImpl.js';
import { GetUsers } from './application/use-cases/GetUsers.js';
import { GetUsersById } from './application/use-cases/GetUsersById.js';
import {UsersController} from './infrastructure/http/controllers/UsersController.js'
dotenv.config();

const router = express.Router();

let usersController; // lazy initialization


router.use(async (req, res, next) => {
  if (!usersController) {
    try {
        const pool = await poolPromise; 

        const repo = new UsersRepositoryImpl(pool);
        const getUsersUseCase = new GetUsers(repo);
        const getUsersByIdUseCase = new GetUsersById(repo);


      usersController = new UsersController(
            getUsersUseCase,
            getUsersByIdUseCase
        );
      console.log('✅ Users microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Users:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de Offices 
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Usuarios del sistema (autenticación y perfiles)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos los usuarios activos
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/users', (req, res) => usersController.getAll(req, res));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/users/:id', (req, res) => usersController.getById(req, res));

export default router;
