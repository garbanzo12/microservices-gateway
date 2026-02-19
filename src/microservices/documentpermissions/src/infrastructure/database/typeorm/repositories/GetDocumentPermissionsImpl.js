import { DocumentPermissions } from '../../../../domain/entities/DocumentPermissions.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class GetDocumentPermissionsImpl {
    constructor() {
    }

    async findAll() {
    const pool = await poolPromise;           
    const result = await pool
    .request()
    .query('SELECT Id, UsuarId, TypeDocumentId,Visualize,Eliminate,Upload,CreatedAt FROM dbo.DocumentPermissions');
        
        // Mapeo de la respuesta
        return result.recordset.map(row => new DocumentPermissions({
            Id: row.Id,
            UsuarId: row.UsuarId,
            TypeDocumentId: row.TypeDocumentId,
            Visualize: row.Visualize,
            Eliminate: row.Eliminate,
            Upload: row.Upload,
            CreatedAt: row.CreatedAt,
        }));
    }
    async findById(id) {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .input("id",id)
        .query(`SELECT Id, UsuarId,TypeDocumentId,Visualize,Eliminate,Upload,CreatedAt FROM dbo.DocumentPermissions WHERE Id = @id`);
        if (result.recordset.length === 0) return null //Validación de existencia del registro 
            const row = result.recordset[0];
            return new DocumentPermissions({ Id: row.Id,UsuarId: row.UsuarId,TypeDocumentId: row.TypeDocumentId,Visualize: row.Visualize,Eliminate: row.Eliminate,Upload: row.Upload,CreatedAt: row.CreatedAt,})
    }   
}