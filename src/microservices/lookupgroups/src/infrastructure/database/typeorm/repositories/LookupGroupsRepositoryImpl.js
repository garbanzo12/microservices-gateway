import { LookupGroups } from '../../../../domain/entities/LookupGroups.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class LookupGroupsRepositoryImpl {
  constructor() {

  }

  // 🔥 Obtener todos los empleados
  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
        Id,
        Name
        ,State
        ,CreateAt
        FROM dbo.LookupGroups
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new LookupGroups({
          Id: row.Id,
          Name: row.Name,
          State: row.State,
          CreateAt: row.CreateAt,
          
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
        Id,
        Name
        ,State
        ,CreateAt
        FROM dbo.LookupGroups
        WHERE Id = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new LookupGroups({
          Id: row.Id,
          Name: row.Name,
          State: row.State,
          CreateAt: row.CreateAt,
    });
  }
}
