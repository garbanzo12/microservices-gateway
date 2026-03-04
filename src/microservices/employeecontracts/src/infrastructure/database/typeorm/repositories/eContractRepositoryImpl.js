import { eContract } from '../../../../domain/entities/EmployeeContract.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';
import sql from 'mssql/msnodesqlv8.js';

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

async create(data) {
    const pool = await poolPromise;
    const request = pool.request();

    request.input('IdEmployee',        sql.Int,   data.IdEmployee ?? null);
    request.input('ContractStartDate', sql.Date,  data.ContractStartDate ?? null);
    request.input('ContractEndDate',   sql.Date,  data.ContractEndDate ?? null);
    request.input('IdCecoName',        sql.Int,   data.IdCecoName ?? null);
    request.input('TypeOfContract',    sql.Int,   data.TypeOfContract ?? null);
    request.input('CreatedBy',         sql.Int,   data.CreatedBy ?? null);   

    const result = await request.query(`
        INSERT INTO dbo.EmployeeContracts 
            (IdEmployee, ContractStartDate, ContractEndDate, IdCecoName, TypeOfContract, CreatedBy)
        OUTPUT 
            INSERTED.Id,
            INSERTED.IdEmployee,
            INSERTED.ContractStartDate,
            INSERTED.ContractEndDate,
            INSERTED.IdCecoName,
            INSERTED.TypeOfContract,
            INSERTED.CreatedAt,
            INSERTED.CreatedBy
        VALUES 
            (@IdEmployee, @ContractStartDate, @ContractEndDate, @IdCecoName, @TypeOfContract, @CreatedBy)
    `);

    if (result.recordset.length === 0) {
        return null;
    }

    const row = result.recordset[0];
    return new eContract({
    id:               row.Id,
    idmeployee:       row.IdEmployee,
    contractstartdate: row.ContractStartDate,
    contrctenddate:  row.ContractEndDate,
    idceconame:       row.IdCecoName,
    typeofcontract:   row.TypeOfContract,
    createdat:        row.CreatedAt,
    creactedby:        row.CreatedBy,
    });
}
}