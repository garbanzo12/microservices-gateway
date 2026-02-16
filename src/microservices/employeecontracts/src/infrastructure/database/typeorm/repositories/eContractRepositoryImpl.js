import { eContract } from '../../../../domain/entities/EmployeeContract.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class eContractRepositoryImpl {
    constructor() {
        
    }
    async findAll() {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .query(
        'SELECT Id, IdEmployee, ContractStartDate,ContractEndDate,IdCecoName,TypeOfContract,CreatedAt,CreatedBy,UpdatedAt,UpdatedBy FROM dbo.EmployeeContracts');
        
        // Mapeo de la respuesta
        return result.recordset.map(row => new eContract({
            id: row.Id,
            idmeployee: row.IdEmployee,
            contractstartdate: row.ContractStartDate,
            contrctenddate: row.ContractEndDate,
            idceconame: row.IdCecoName,
            typeofcontract: row.TypeOfContract,
            createdat: row.CreatedAt,
            creactedby: row.CreatedBy,
            updateat: row.UpdatedAt,
            updateby: row.UpdatedBy
        }));
    }
    async findById(id) {
        const pool = await poolPromise;           
        const result = await pool
        .request()
        .input("id",id)
        .query(
        `SELECT Id, IdEmployee, ContractStartDate,ContractEndDate,IdCecoName,TypeOfContract,CreatedAt,CreatedBy,UpdatedAt,UpdatedBy FROM dbo.EmployeeContracts WHERE Id = @id`);
        if (result.recordset.length === 0) return null //Validación de existencia del registro 
        const row = result.recordset[0];
        return new eContract({id: row.Id,idmeployee: row.IdEmployee,contractstartdate: row.ContractStartDate,contrctenddate: row.ContractEndDate,idceconame: row.IdCecoName,typeofcontract: row.TypeOfContract,createdat: row.CreatedAt,creactedby: row.CreatedBy,updateat: row.UpdatedAt,updateby: row.UpdatedBy})
    }   
}