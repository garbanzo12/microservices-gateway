import { Company } from '../../../../domain/entities/Company.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class CompanyRepositoryImpl {
    constructor() {
    }

    async findAll() {
    const pool = await poolPromise;           
    const result = await pool
    .request()
    .query('SELECT Id, Name, State FROM dbo.Companies');
        
        // Mapeo de la respuesta
        return result.recordset.map(row => new Company({
            id: row.Id,
            name: row.Name,
            state: row.State
        }));
    }
    async findById(id) {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .input("id",id)
        .query(`SELECT Id, Name, State FROM dbo.Companies WHERE Id = @id`);
        if (result.recordset.length === 0) return null //Validación de existencia del registro 
            const row = result.recordset[0];
            return new Company({id: row.Id, name: row.Name, state: row.State})
    }   
}