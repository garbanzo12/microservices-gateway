import { Offices } from '../../../../domain/entities/Offices.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class OfficesRepositoryImpl {
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
          Name,
          City,
          Active
        FROM dbo.Offices
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Offices({
          Id: row.Id,
          Name: row.Name,
          City: row.City,
          Active: row.Active,
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
          Name,
          City,
          Active
        FROM dbo.Offices
        WHERE Id = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Offices({
      Id: row.Id,
      Name: row.Name,
      City: row.City,
      Active: row.Active,      
    });
  }
}
