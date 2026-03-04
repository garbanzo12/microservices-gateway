import { Employee } from '../../../../domain/entities/Employee.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';
import sql from 'mssql/msnodesqlv8.js';

export class EmployeeRepositoryImpl {
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
          DocumentNumber,
          DocumentType,
          FullName,
          Gender,
          MaritalStatus,
          DateOfBirth,
          PlaceOfBirth,
          Phone1,
          Phone2,
          Address,
          Email,
          Post,
          CompanyId,
          EmployeeType,
          OfficeId,
          Asset,
          DateOfEntry,
          CompletionDate,
          FirsName,
          LastName,
          CauseWithdrawal,
          TypeOfContract,
          IdCecoName
        FROM dbo.Employees
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Employee({
          Id: row.Id,
          DocumentNumber: row.DocumentNumber,
          DocumentType: row.DocumentType,
          FullName: row.FullName,
          Gender: row.Gender,
          MaritalStatus: row.MaritalStatus,
          DateOfBirth: row.DateOfBirth,
          PlaceOfBirth: row.PlaceOfBirth,
          Phone1: row.Phone1,
          Phone2: row.Phone2,
          Address: row.Address,
          Email: row.Email,
          Post: row.Post,
          CompanyId: row.CompanyId,
          EmployeeType: row.EmployeeType,
          OfficeId: row.OfficeId,
          Asset: row.Asset,
          DateOfEntry: row.DateOfEntry,
          CompletionDate: row.CompletionDate,
          FirsName: row.FirsName,
          LastName: row.LastName,
          CauseWithdrawal: row.CauseWithdrawal,
          TypeOfContract: row.TypeOfContract,
          IdCecoName: row.IdCecoName,
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
          DocumentNumber,
          DocumentType,
          FullName,
          Gender,
          MaritalStatus,
          DateOfBirth,
          PlaceOfBirth,
          Phone1,
          Phone2,
          Address,
          Email,
          Post,
          CompanyId,
          EmployeeType,
          OfficeId,
          Asset,
          DateOfEntry,
          CompletionDate,
          FirsName,
          LastName,
          CauseWithdrawal,
          TypeOfContract,
          IdCecoName
        FROM dbo.Employees
        WHERE Id = @id
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Employee({
      Id: row.Id,
      DocumentNumber: row.DocumentNumber,
      DocumentType: row.DocumentType,
      FullName: row.FullName,
      Gender: row.Gender,
      MaritalStatus: row.MaritalStatus,
      DateOfBirth: row.DateOfBirth,
      PlaceOfBirth: row.PlaceOfBirth,
      Phone1: row.Phone1,
      Phone2: row.Phone2,
      Address: row.Address,
      Email: row.Email,
      Post: row.Post,
      CompanyId: row.CompanyId,
      EmployeeType: row.EmployeeType,
      OfficeId: row.OfficeId,
      Asset: row.Asset,
      DateOfEntry: row.DateOfEntry,
      CompletionDate: row.CompletionDate,
      FirsName: row.FirsName,
      LastName: row.LastName,
      CauseWithdrawal: row.CauseWithdrawal,
      TypeOfContract: row.TypeOfContract,
      IdCecoName: row.IdCecoName,
    });
  }


    async create(data) {
    const pool = await poolPromise;
    const request = pool.request();


    request.input('DocumentNumber',   sql.Int,  data.DocumentNumber ?? null);
    request.input('DocumentType',   sql.Int,  data.DocumentType ?? null);
    request.input('FullName',       sql.VarChar(150), data.FullName?.trim() ?? null);
    request.input('Gender',       sql.VarChar(5), data.Gender?.trim() ?? null);
    request.input('MaritalStatus',       sql.VarChar(50), data.MaritalStatus?.trim() ?? null);
    request.input('DateOfBirth',  sql.Date,          data.DateOfBirth ?? null);
    request.input('PlaceOfBirth',       sql.VarChar(50), data.PlaceOfBirth?.trim() ?? null);
    request.input('Phone1', sql.BigInt, data.Phone1 ?? null);
    request.input('Phone2', sql.BigInt, data.Phone2 ?? null);
    request.input('Address',   sql.VarChar(100),          data.Address ?? null);
    request.input('Email',   sql.VarChar(100),          data.Email ?? null);
    request.input('Post',  sql.Int,          data.Post ?? null);
    request.input('CompanyId',  sql.Int,          data.CompanyId ?? null);
    request.input('EmployeeType',  sql.Int,          data.EmployeeType ?? null);
    request.input('OfficeId',  sql.Int,          data.OfficeId ?? null);
    request.input('Asset',  sql.Int,          data.Asset ?? null);
    request.input('DateOfEntry',  sql.Date,          data.DateOfEntry ?? null);
    request.input('CompletionDate', sql.Date, data.CompletionDate ?? null);    
    request.input('FirsName',   sql.VarChar(100),          data.FirsName ?? null);
    request.input('LastName',   sql.VarChar(100),          data.LastName ?? null);
    request.input('CauseWithdrawal',   sql.VarChar(100),          data.CauseWithdrawal ?? null);
    request.input('TypeOfContract',  sql.Int,          data.TypeOfContract ?? null);
    request.input('IdCecoName',  sql.Int,          data.IdCecoName ?? null);

    const result = await request.query(`
      INSERT INTO dbo.Employees 
        (DocumentNumber, DocumentType, FullName, Gender, MaritalStatus, DateOfBirth,PlaceOfBirth,Phone1,Phone2,Address,Email,Post,CompanyId,EmployeeType,OfficeId,Asset,DateOfEntry,CompletionDate,FirsName,LastName,CauseWithdrawal,TypeOfContract,IdCecoName)
      OUTPUT 
          INSERTED.Id,
          INSERTED.DocumentNumber,
          INSERTED.DocumentType,
          INSERTED.FullName,
          INSERTED.Gender,
          INSERTED.MaritalStatus,
          INSERTED.DateOfBirth,
          INSERTED.PlaceOfBirth,
          INSERTED.Phone1,
          INSERTED.Phone2,
          INSERTED.Address,
          INSERTED.Email,
          INSERTED.Post,
          INSERTED.CompanyId,
          INSERTED.EmployeeType,
          INSERTED.OfficeId,
          INSERTED.Asset,
          INSERTED.DateOfEntry,
          INSERTED.CompletionDate,
          INSERTED.FirsName,
          INSERTED.LastName,
          INSERTED.CauseWithdrawal,
          INSERTED.TypeOfContract,
          INSERTED.IdCecoName
      VALUES 
        (@DocumentNumber, @DocumentType, @FullName, @Gender, @MaritalStatus, @DateOfBirth,@PlaceOfBirth,@Phone1,@Phone2,@Address,@Email,@Post,@CompanyId,@EmployeeType,@OfficeId,@Asset,@DateOfEntry,@CompletionDate,@FirsName,@LastName,@CauseWithdrawal,@TypeOfContract,@IdCecoName)
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const row = result.recordset[0];

    return new Employee({
                  Id : row.Id,
                  DocumentNumber : row.DocumentNumber,
                  DocumentType : row.DocumentType,
                  FullName : row.FullName,
                  Gender : row.Gender,
                  MaritalStatus : row.MaritalStatus,
                  DateOfBirth : row.DateOfBirth,
                  PlaceOfBirth : row.PlaceOfBirth,
                  Phone1 : row.Phone1,
                  Phone2 : row.Phone2,
                  Address : row.Address,
                  Email : row.Email,
                  Post : row.Post,
                  CompanyId : row.CompanyId,
                  EmployeeType : row.EmployeeType,
                  OfficeId : row.OfficeId,
                  Asset : row.Asset,
                  DateOfEntry : row.DateOfEntry,
                  CompletionDate : row.CompletionDate,
                  FirsName : row.FirsName,
                  LastName : row.LastName,
                  CauseWithdrawal : row.CauseWithdrawal,
                  TypeOfContract : row.TypeOfContract,
                  IdCecoName : row.IdCecoName,
    });
  }
}