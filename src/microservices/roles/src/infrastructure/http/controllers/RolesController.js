import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class RolesController {
  constructor(getRolesUseCase, getRolesByIdUseCase) {
    this.getRolesUseCase = getRolesUseCase;
    this.getRolesByIdUseCase = getRolesByIdUseCase;
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
      [10:59:04 a. m.] ✅ GET /roles - Petición exitosa {"count":1}
      [10:59:17 a. m.] ✅ GET /roles/1 - Petición exitosa 
      [10:59:19 a. m.] ❌ GET /roles/0 - No encontrado   */
  
  getAll = async (req, res) => {
    try {
      const roles = await this.getRolesUseCase.execute();
      
      if (!roles || roles.length === 0) {
        this.#log('error', 'GET /roles - No se encontraron registros');
        return res.status(404).json({ message: "roles not found" });
      }

      this.#log('success', 'GET /roles - Petición exitosa', { count: roles.length });
      res.json(roles);
    } catch (error) {
      this.#log('error', 'GET /roles - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await this.getRolesByIdUseCase.execute(id);

      if (!rol) {
        this.#log('error', `GET /roles/${id} - No encontrado`);
        return res.status(404).json({ message: "rol not found" });
      }

      this.#log('success', `GET /roles/${id} - Petición exitosa`);
      res.json(rol);
    } catch (error) {
      this.#log('error', `GET /roles/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}