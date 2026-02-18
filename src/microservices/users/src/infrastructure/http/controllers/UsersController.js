import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class UsersController {
  constructor(getUsersUseCase, getUsersByIdUseCase) {
    this.getUsersUseCase = getUsersUseCase;
    this.getUsersByIdUseCase = getUsersByIdUseCase;
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
      [9:07:06 a. m.] ✅ GET /users/3 - Petición exitosa 
      [9:07:42 a. m.] ✅ GET /users - Petición exitosa {"count":6}
      [9:07:44 a. m.] ❌ GET /users/1 - No encontrado   */
  
  getAll = async (req, res) => {
    try {
      const users = await this.getUsersUseCase.execute();
      
      if (!users || users.length === 0) {
        this.#log('error', 'GET /users - No se encontraron registros');
        return res.status(404).json({ message: "Users not found" });
      }

      this.#log('success', 'GET /users - Petición exitosa', { count: users.length });
      res.json(users);
    } catch (error) {
      this.#log('error', 'GET /users - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await this.getUsersByIdUseCase.execute(id);

      if (!user) {
        this.#log('error', `GET /users/${id} - No encontrado`);
        return res.status(404).json({ message: "User not found" });
      }

      this.#log('success', `GET /users/${id} - Petición exitosa`);
      res.json(user);
    } catch (error) {
      this.#log('error', `GET /users/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}