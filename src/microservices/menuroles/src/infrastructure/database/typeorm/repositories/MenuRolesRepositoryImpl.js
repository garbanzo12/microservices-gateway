import { MenuRoles } from '../../../../domain/entities/MenuRoles.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class MenuRolesRepositoryImpl {
  constructor() {
  }


  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
        MenuRolId,
        RoleId,
        MenuId
        ,State
        FROM dbo.MenuRoles
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new MenuRoles({
        MenuRolId : row.MenuRolId,
        RoleId : row.RoleId
        ,MenuId : row.MenuId
        ,State : row.State
        })
    );
  }

  // 🔥 Buscar empleado por Id
  async findById(id) {
    const pool = await poolPromise;           
    const result = await pool      
      .request()
      .input("id", id)
      .query(`
        SELECT 
        MenuRolId,
        RoleId,
        MenuId
        ,State
        FROM dbo.MenuRoles
        WHERE RoleId = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new MenuRoles({
          MenuRolId: row.MenuRolId,
          RoleId: row.RoleId,
          MenuId: row.MenuId,
          State: row.State 
    });
  }
}
