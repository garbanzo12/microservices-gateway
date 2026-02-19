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

router.get('/menuroles', (req, res) => menuRolesController.getAll(req, res));
router.get('/menuroles/:id', (req, res) => menuRolesController.getById(req, res));
export default router;
