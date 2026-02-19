import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class UserRolesController {
  constructor(getUserRolesUseCase, getUserRolesByIdUseCase) {
    this.getUserRolesUseCase = getUserRolesUseCase;
    this.getUserRolesByIdUseCase = getUserRolesByIdUseCase;
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
      const userroles = await this.getUserRolesUseCase.execute();
      
      if (!userroles || userroles.length === 0) {
        this.#log('error', 'GET /userroles - No se encontraron registros');
        return res.status(404).json({ message: "userroles not found" });
      }

      this.#log('success', 'GET /userroles - Petición exitosa', { count: userroles.length });
      res.json(userroles);
    } catch (error) {
      this.#log('error', 'GET /userroles - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const userrol = await this.getUserRolesByIdUseCase.execute(id);

      if (!userrol) {
        this.#log('error', `GET /userroles/${id} - No encontrado`);
        return res.status(404).json({ message: "rol not found" });
      }

      this.#log('success', `GET /userroles/${id} - Petición exitosa`);
      res.json(userrol);
    } catch (error) {
      this.#log('error', `GET /userroles/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}