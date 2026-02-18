import { Users } from '../../../../domain/entities/Users.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class UsersRepositoryImpl {
  constructor() {
  }

  // 🔥 Obtener todos los empleados
  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
          UserId,
          Name,
          Document,
          UserName,
          Password,
          Email,
          State,
          AuditCreateUser,
          CreatedAt
        FROM dbo.Users
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Users({
          UserId: row.UserId,
          Name: row.Name,
          Document: row.Document,
          UserName: row.UserName,
          Password: row.Password,
          Email: row.Email,
          State: row.State,
          AuditCreateUser: row.AuditCreateUser,
          CreatedAt: row.CreatedAt

        })
    );
  }

  // 🔥 Buscar empleado por UserId
  async findById(UserId) {
    const pool = await poolPromise;           
    const result = await pool      
      .request()
      .input("UserId", UserId)
      .query(`
        SELECT 
          UserId,
          Name,
          Document,
          UserName,
          Password,
          Email,
          State,
          AuditCreateUser,
          CreatedAt
        FROM dbo.Users
        WHERE UserId = @UserId
      `);

    // ✅ ValUserIdación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Users({
          UserId: row.UserId,
          Name: row.Name,
          Document: row.Document,
          UserName: row.UserName,
          Password: row.Password,
          Email: row.Email,
          State: row.State,
          AuditCreateUser: row.AuditCreateUser,
          CreatedAt: row.CreatedAt     
    });
  }
}
