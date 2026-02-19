import { UserRoles } from '../../../../domain/entities/UserRoles.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class UserRolesRepositoryImpl {
  constructor() {
  }


  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
        UserRoleId,
        RoleId,
        UserId
        ,State
        FROM dbo.UserRoles
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new UserRoles({
        UserRoleId : row.UserRoleId,
        RoleId : row.RoleId
        ,UserId : row.UserId
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
        UserRoleId,
        RoleId,
        UserId
        ,State
        FROM dbo.UserRoles
        WHERE RoleId = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new UserRoles({
          UserRoleId: row.UserRoleId,
          RoleId: row.RoleId,
          UserId: row.UserId,
          State: row.State 
    });
  }
}
