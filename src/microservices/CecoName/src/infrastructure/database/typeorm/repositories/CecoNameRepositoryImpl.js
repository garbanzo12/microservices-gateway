import { CecoName } from '../../../../domain/entities/CecoName.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';
import sql from 'mssql/msnodesqlv8.js';
export class CecoNameRepositoryImpl {
    constructor() {
    }

    async findAll() {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .query(
        'SELECT Id,Cecocode, Name, State,CreatedBy,CreatedAt,UpdatedBy,UpdateAt FROM dbo.CecoName');
        
        // Mapeo de la respuesta
        
       return result.recordset.map(row => new CecoName({
        Id: row.Id,
        Cecocode: row.Cecocode,
        Name: row.Name,
        State: row.State,
        CreatedBy: row.CreatedBy,
        CreatedAt: row.CreatedAt,
        UpdatedBy: row.UpdatedBy,
        UpdateAt: row.UpdateAt
        }));

   

    }
    async findById(id) {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .input("id", id)
        .query(
            `SELECT Id,Cecocode, Name, State,CreatedBy,CreatedAt,UpdatedBy,UpdateAt FROM dbo.CecoName WHERE Id = @id`);
        if (result.recordset.length === 0) return null //Validación de existencia del registro 
        const row = result.recordset[0];
        return new CecoName({Id: row.Id,Cecocode: row.Cecocode, Name: row.Name, State: row.State,CreatedBy: row.CreatedBy,CreatedAt: row.CreatedAt,UpdatedBy: row.UpdatedBy,UpdateAt: row.UpdateAt})
    } 
    
      /**
   * Crea un nuevo registro de CecoName
   * @param {Object} data 
   * @returns {Promise<CecoName|null>}
   */
  async create(data) {
    const pool = await poolPromise;
    const request = pool.request();

    // Validaciones básicas
    if (!data.Cecocode?.trim()) throw new Error("Cecocode es requerido");
    if (!data.Name?.trim()) throw new Error("Name es requerido");

    request.input('Cecocode',   sql.Int,  data.Cecocode ?? null);
    request.input('Name',       sql.VarChar(150), data.Name?.trim() ?? null);
    request.input('State',      sql.Int,          data.State ?? true ? 1 : 0);
    request.input('CreatedBy',  sql.Int,          data.CreatedBy ?? null);
    const result = await request.query(`
      INSERT INTO dbo.CecoName 
        (Cecocode, Name, State, CreatedBy, CreatedAt)
      OUTPUT 
        INSERTED.Id,
        INSERTED.Cecocode,
        INSERTED.Name,
        INSERTED.State,
        INSERTED.CreatedBy,
        INSERTED.CreatedAt,
        INSERTED.UpdatedBy,
        INSERTED.UpdateAt
      VALUES 
        (@Cecocode, @Name, @State, @CreatedBy, GETDATE())
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const row = result.recordset[0];

    return new CecoName({
      Id: row.Id,
      Cecocode: row.Cecocode,
      Name: row.Name,
      State: row.State,
      CreatedBy: row.CreatedBy,
      CreatedAt: row.CreatedAt,
      UpdatedBy: row.UpdatedBy,
      UpdateAt: row.UpdateAt
    });
  }
}