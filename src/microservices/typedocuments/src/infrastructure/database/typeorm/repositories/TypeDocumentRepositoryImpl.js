// src/microservicios/typedocuments/infrastructure/database/typeorm/repositories/TypeDocumentRepositoryImpl.js

import { TypeDocument } from '../../../../domain/entities/TypeDocument.js';

// Importamos el pool COMPARTIDO (ajusta la ruta según tu estructura final)
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';
export class TypeDocumentRepositoryImpl {
  constructor() {
   
  }

  // 🔥 Obtener todos
  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
          Id,
          TypeDocument,
          Nomenclature,
          State,
          Father,
          CreatAt
        FROM dbo.TypeDocuments
      `);

    return result.recordset.map(
      (row) =>
        new TypeDocument({
          Id: row.Id,
          TypeDocument: row.TypeDocument,
          Nomenclature: row.Nomenclature,
          State: row.State,
          Father: row.Father,
          CreatAt: row.CreatAt,
        })
    );
  }

  // 🔥 Buscar por Id
  async findById(id) {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .input("id", id)
      .query(`
        SELECT 
          Id,
          TypeDocument,
          Nomenclature,
          State,
          Father,
          CreatAt
        FROM dbo.TypeDocuments
        WHERE Id = @id
      `);

    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new TypeDocument({
      Id: row.Id,
      TypeDocument: row.TypeDocument,
      Nomenclature: row.Nomenclature,
      State: row.State,
      Father: row.Father,
      CreatAt: row.CreatAt,
    });
  }


}