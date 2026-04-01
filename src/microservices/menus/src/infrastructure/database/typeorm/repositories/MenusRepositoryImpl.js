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


async create(data) {
    const pool = await poolPromise;
    const request = pool.request();

    request.input('Name',       sql.VarChar(150), data.Name?.trim() ?? null);
    request.input('Icon',       sql.VarChar(150), data.Icon?.trim() ?? null);
    request.input('URL',       sql.VarChar(150), data.URL?.trim() ?? null);
    request.input('FatherId',        sql.Int,   data.FatherId ?? null);
    request.input('State',    sql.Int,   data.State ?? null);
    request.input('OrderMenu',         sql.Int,   data.OrderMenu ?? null);   

    const result = await request.query(`
        INSERT INTO dbo.Menus 
            (Name, Icon, URL, FatherId, State, OrderMenu)
        OUTPUT 
            INSERTED.MenuId,
            INSERTED.Name,
            INSERTED.Icon,
            INSERTED.URL,
            INSERTED.FatherId,
            INSERTED.State,
            INSERTED.OrderMenu,
        VALUES 
            (@Name, @Icon, @URL, @FatherId, @State, @OrderMenu)
    `);

    if (result.recordset.length === 0) {
        return null;
    }

    const row = result.recordset[0];
    return new Menus({
      MenuId:row.MenuId,
      Name : row.Name ,
      Icon : row.Icon ,
      URL : row.URL ,
      FatherId : row.FatherId ,
      State : row.State ,
      OrderMenu : row.OrderMenu ,
    });
}


    async delete(id) {
      const pool = await poolPromise;
      const request = pool.request();
  
      request.input('id', sql.Int, id);
  
      const result = await request.query(`
          DELETE FROM dbo.Menus
          OUTPUT  
            DELETED.MenuId,
            DELETED.Name
            DELETED.Icon
            DELETED.URL
            DELETED.FatherId
            DELETED.State
            DELETED.OrderMenu
          WHERE MenuId = @id`
          );
  
      if (result.recordset.length === 0) {
          return null;
      }
  
      const row = result.recordset[0];
  
      return new Menus({
      MenuId:row.MenuId,
      Name : row.Name ,
      Icon : row.Icon ,
      URL : row.URL ,
      FatherId : row.FatherId ,
      State : row.State ,
      OrderMenu : row.OrderMenu ,
      });
  }
}
