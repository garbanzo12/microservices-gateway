import { CecoName } from '../../../../domain/entities/CecoName.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';
import sql from 'mssql';   
export class CecoNameRepositoryImpl {
    constructor() {
    }

    async findAll() {
        const pool = await poolPromise();           
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


    async Create(data) {
        try {
            const pool = await poolPromise;
            console.log('Pool válido antes de request:', !!pool);
             console.log('Creando request...');
            if (!pool.connected) {
            console.log('Pool no conectado → reconectando');
            await pool.connect();
            }
            const request = pool.request();
            

            // Parámetros con tipos explícitos (mejora seguridad y legibilidad)
            request.input('Cecocode',   sql.VarChar(50),  data.Cecocode?.trim() || null);
            request.input('Name',       sql.VarChar(150), data.Name?.trim() || null);
            request.input('State',      sql.Bit,          data.State === false || data.State === 0 ? 0 : 1);
            request.input('CreatedBy',  sql.Int,          data.CreatedBy || null);

            // Validación mínima antes de insertar
            if (!data.Cecocode?.trim()) {
                throw new Error("Cecocode es requerido");
            }
            if (!data.Name?.trim()) {
                throw new Error("Name es requerido");
            }
console.log('Request creado exitosamente:', !!request);
    console.log('Preparando inputs...');
    
    // ← aquí van tus request.input(...)
    
    console.log('Ejecutando query...');
            // Insert + OUTPUT para retornar el registro completo recién creado
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
                return null; // No se insertó (por ejemplo, violación de constraint)
            }

            const row = result.recordset[0];

            // Mapeo consistente con findAll y findById
            return new CecoName({
                Id:         row.Id,
                Cecocode:   row.Cecocode,
                Name:       row.Name,
                State:      row.State,
                CreatedBy:  row.CreatedBy,
                CreatedAt:  row.CreatedAt,
                UpdatedBy:  row.UpdatedBy,
                UpdateAt:   row.UpdateAt
            });

        } catch (error) {
            console.error('Error al crear CecoName:', error.message);
            throw error; // Puedes personalizar: throw new Error("No se pudo crear el CecoName");
        }
    }
}
