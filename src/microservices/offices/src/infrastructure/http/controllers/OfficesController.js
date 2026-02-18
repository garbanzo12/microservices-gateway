import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class OfficesController {
  constructor(getOfficesUseCase, getOfficesByIdUseCase) {
    this.getOfficesUseCase = getOfficesUseCase;
    this.getOfficesByIdUseCase = getOfficesByIdUseCase;
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
      const offices = await this.getOfficesUseCase.execute();
      
      if (!offices || offices.length === 0) {
        this.#log('error', 'GET /office - No se encontraron registros');
        return res.status(404).json({ message: "offices not found" });
      }

      this.#log('success', 'GET /office - Petición exitosa', { count: offices.length });
      res.json(offices);
    } catch (error) {
      this.#log('error', 'GET /office - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const office = await this.getOfficesByIdUseCase.execute(id);

      if (!office) {
        this.#log('error', `GET /office/${id} - No encontrado`);
        return res.status(404).json({ message: "office not found" });
      }

      this.#log('success', `GET /office/${id} - Petición exitosa`);
      res.json(office);
    } catch (error) {
      this.#log('error', `GET /office/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}