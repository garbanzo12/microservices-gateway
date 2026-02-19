import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { UserRolesRepositoryImpl } from './infrastructure/database/typeorm/repositories/UserRolesRepositoryImpl.js';
import { GetUserRoles } from './application/use-cases/GetUserRoles.js';
import { GetUserRolesById } from './application/use-cases/GetUserRolesById.js';
import {UserRolesController} from './infrastructure/http/controllers/UserRolesController.js'
dotenv.config();

const router = express.Router();

let userRolesController; // lazy initialization


router.use(async (req, res, next) => {
  if (!userRolesController) {
    try {
        const pool = await poolPromise; 

        const repo = new UserRolesRepositoryImpl(pool);
        const getUserRolesUseCase = new GetUserRoles(repo);
        const getUserRolesByIdUseCase = new GetUserRolesById(repo);


      userRolesController = new UserRolesController(
            getUserRolesUseCase,
            getUserRolesByIdUseCase
        );
      console.log('✅ UserRoles microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar UserRoles:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de roles 

router.get('/userroles', (req, res) => userRolesController.getAll(req, res));
router.get('/userroles/:id', (req, res) => userRolesController.getById(req, res));
export default router;
