import { Menus } from '../../../../domain/entities/Menus.js';
import  poolPromise  from '../../../../../../../shared/database/mssql-pool.js';

export class MenusRepositoryImpl {
  constructor() {
  }

  // 🔥 Obtener todos los empleados
  async findAll() {
    const pool = await poolPromise;           
    const result = await pool
      .request()
      .query(`
        SELECT 
        MenuId
        ,Name
        ,Icon
        ,URL
        ,FatherId
        ,State
        FROM dbo.Menus
      `);

    // ✅ Mapeo hacia lógica de negocio
    return result.recordset.map(
      (row) =>
        new Menus({
          MenuId: row.MenuId,
          Name: row.Name,
          Icon: row.Icon,
          URL: row.URL,
          FatherId: row.FatherId,
          UStateRL: row.State,
        })
    );
  }

  // 🔥 Buscar empleado por Id
  async findById(MenuId) {
    const pool = await poolPromise;           
    const result = await pool      
      .request()
      .input("MenuId", MenuId)
      .query(`
        SELECT 
        MenuId
        ,Name
        ,Icon
        ,URL
        ,FatherId
        ,State
        FROM dbo.Menus
        WHERE MenuId = @MenuId
      `);

    // ✅ Validación si no existe
    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];

    return new Menus({
          MenuId: row.MenuId,
          Name: row.Name,
          Icon: row.Icon,
          URL: row.URL,
          FatherId: row.FatherId,
          UStateRL: row.State,     
    });
  }
}
