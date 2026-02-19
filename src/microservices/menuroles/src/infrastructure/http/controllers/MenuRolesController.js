import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class MenuRolesController {
  constructor(getMenuRolesUseCase, getMenuRolesByIdUseCase) {
    this.getMenuRolesUseCase = getMenuRolesUseCase;
    this.getMenuRolesByIdUseCase = getMenuRolesByIdUseCase;
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
  */
  
  getAll = async (req, res) => {
    try {
      const Menuroles = await this.getMenuRolesUseCase.execute();
      
      if (!Menuroles || Menuroles.length === 0) {
        this.#log('error', 'GET /menuroles - No se encontraron registros');
        return res.status(404).json({ message: "Menuroles not found" });
      }

      this.#log('success', 'GET /menuroles - Petición exitosa', { count: Menuroles.length });
      res.json(Menuroles);
    } catch (error) {
      this.#log('error', 'GET /menuroles - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const Menurol = await this.getMenuRolesByIdUseCase.execute(id);

      if (!Menurol) {
        this.#log('error', `GET /menuroles/${id} - No encontrado`);
        return res.status(404).json({ message: "rol not found" });
      }

      this.#log('success', `GET /menuroles/${id} - Petición exitosa`);
      res.json(Menurol);
    } catch (error) {
      this.#log('error', `GET /menuroles/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}