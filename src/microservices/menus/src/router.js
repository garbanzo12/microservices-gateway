import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import poolPromise from '../../../shared/database/mssql-pool.js';
import { MenusRepositoryImpl } from './infrastructure/database/typeorm/repositories/MenusRepositoryImpl.js';
import { GetMenus } from './application/use-cases/GetMenus.js';
import { GetMenusById } from './application/use-cases/GetMenusById.js';
import {MenusController} from './infrastructure/http/controllers/MenusController.js'
dotenv.config();

const router = express.Router();

let menusController; // lazy initialization


router.use(async (req, res, next) => {
  if (!menusController) {
    try {
        const pool = await poolPromise; 

        const repo = new MenusRepositoryImpl(pool);
        const getMenusUseCase = new GetMenus(repo);
        const getMenusByIdUseCase = new GetMenusById(repo);


      menusController = new MenusController(
            getMenusUseCase,
            getMenusByIdUseCase
        );
      console.log('✅ Menus microservicio inicializado');
    } catch (err) {
      console.error('❌ Error al inicializar Menus:', err);
      return res.status(500).json({ error: 'Error interno al iniciar módulo' });
    }
  }
  next();
});


//Endpoints de menus 

router.get('/menus', (req, res) => menusController.getAll(req, res));
router.get('/menus/:id', (req, res) => menusController.getById(req, res));
export default router;
