import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class MenusController {
  constructor(getMenusUseCase, getMenusByIdUseCase) {
    this.getMenusUseCase = getMenusUseCase;
    this.getMenusByIdUseCase = getMenusByIdUseCase;
  }

  // Este es un helper para centralizar el formato del log
  #log(type, message, data = '') {
    const time = new Date().toLocaleTimeString();
    const icons = { success: '✅', error: '❌', info: 'ℹ️' }; // Iconos para exito (✅), error (❌) e info (ℹ️)
    const colors = { success: pc.green, error: pc.red, info: pc.blue }; // Los colores son verdes(200), para petición exitosa, rojo para petición fallida(400-500), azul para info (100)
    
    console.log(
      `${pc.gray(`[${time}]`)} ${colors[type](icons[type])} ${pc.bold(message)}`,
      data ? pc.dim(JSON.stringify(data)) : '' // La salida del log se veria asi ([hora] [icono] [Tipo petición] [endpoint] - [Respuesta] )
    );
  } /* Ejemplos de este log
      ([hora] [icono] [Tipo petición] [endpoint] - [Respuesta] )
      pendiente
  */
  
  getAll = async (req, res) => {
    try {
      const menus = await this.getMenusUseCase.execute();
      
      if (!menus || menus.length === 0) {
        this.#log('error', 'GET /menus - No se encontraron registros');
        return res.status(404).json({ message: "menus not found" });
      }

      this.#log('success', 'GET /menus - Petición exitosa', { count: menus.length });
      res.json(menus);
    } catch (error) {
      this.#log('error', 'GET /menus - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const menu = await this.getMenusByIdUseCase.execute(id);

      if (!menu) {
        this.#log('error', `GET /menus/${id} - No encontrado`);
        return res.status(404).json({ message: "menu not found" });
      }

      this.#log('success', `GET /menus/${id} - Petición exitosa`);
      res.json(menu);
    } catch (error) {
      this.#log('error', `GET /menus/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}