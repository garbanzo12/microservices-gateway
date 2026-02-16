import { LookupDetail } from "../../../../domain/entities/LookupDetail.js";
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class LookupDetailRepositoryImpl {
  constructor() {
    
  }

  // 🔥 Traer todos los registros
  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
    .request()
    .query(`
      SELECT 
        Id,
        Name,
        LookupGroupId,
        State,
        CreateAt,
        Value
      FROM dbo.LookupDetails
    `);

    // ✅ Mapeo de la respuesta
    return result.recordset.map(
      row =>
        new LookupDetail({
          Id: row.Id,
          Name: row.Name,
          LookupGroupId: row.LookupGroupId,
          State: row.State,
          CreateAt: row.CreateAt,
          Value: row.Value
        })
    );
  }

  // 🔍 Buscar por Id
  async findById(id) {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .input("id", id)
      .query(`
        SELECT 
          Id,
          Name,
          LookupGroupId,
          State,
          CreateAt,
          Value
        FROM dbo.LookupDetails
        WHERE Id = @id
      `);

    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new LookupDetail({
      Id: row.Id,
      Name: row.Name,
      LookupGroupId: row.LookupGroupId,
      State: row.State,
      CreateAt: row.CreateAt,
      Value: row.Value
    });
  }
}
