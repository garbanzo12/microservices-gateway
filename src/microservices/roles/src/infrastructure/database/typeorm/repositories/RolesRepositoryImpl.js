import { Roles } from '../../../../domain/entities/Roles.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class RolesRepositoryImpl {
  constructor() {
  }


  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
        RoleId,
        Description
        ,State
        FROM dbo.Roles
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Roles({
        RoleId : row.RoleId
        ,Description : row.Description
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
        RoleId,
        Description
        ,State
        FROM dbo.Roles
        WHERE RoleId = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Roles({
          RoleId: row.RoleId,
          Description: row.Description,
          State: row.State 
    });
  }
}
