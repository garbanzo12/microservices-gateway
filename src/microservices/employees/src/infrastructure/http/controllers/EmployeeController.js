import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class EmployeeController {
  constructor(getEmployeeUseCase, getEmployeeByIdUseCase) {
    this.getEmployeeUseCase = getEmployeeUseCase;
    this.getEmployeeByIdUseCase = getEmployeeByIdUseCase;
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
      const employees = await this.getEmployeeUseCase.execute();
      
      if (!employees || employees.length === 0) {
        this.#log('error', 'GET /employee - No se encontraron registros');
        return res.status(404).json({ message: "employees not found" });
      }

      this.#log('success', 'GET /employee - Petición exitosa', { count: employees.length });
      res.json(employees);
    } catch (error) {
      this.#log('error', 'GET /employee - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await this.getEmployeeByIdUseCase.execute(id);

      if (!employee) {
        this.#log('error', `GET /employee/${id} - No encontrado`);
        return res.status(404).json({ message: "employee not found" });
      }

      this.#log('success', `GET /employee/${id} - Petición exitosa`);
      res.json(employee);
    } catch (error) {
      this.#log('error', `GET /employee/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}