import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class LookupDetailsController {
  constructor(getLookupDetailsUseCase, getLookupDetailsByIdUseCase) {
    this.getLookupDetailsUseCase = getLookupDetailsUseCase;
    this.getLookupDetailsByIdUseCase = getLookupDetailsByIdUseCase;
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
      [8:42:35 a. m.] ✅ GET /lookupdetail - Petición exitosa {"count":261}
      [8:42:39 a. m.] ✅ GET /lookupdetail/1 - Petición exitosa 
      [8:42:55 a. m.] ❌ GET /lookupdetail/0 - No encontrado 
  */
  
  getAll = async (req, res) => {
    try {
      const lookupdetails = await this.getLookupDetailsUseCase.execute();
      
      if (!lookupdetails || lookupdetails.length === 0) {
        this.#log('error', 'GET /lookupdetail - No se encontraron registros');
        return res.status(404).json({ message: "lookupdetails not found" });
      }

      this.#log('success', 'GET /lookupdetail - Petición exitosa', { count: lookupdetails.length });
      res.json(lookupdetails);
    } catch (error) {
      this.#log('error', 'GET /lookupdetail - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const lookupdetail = await this.getLookupDetailsByIdUseCase.execute(id);

      if (!lookupdetail) {
        this.#log('error', `GET /lookupdetail/${id} - No encontrado`);
        return res.status(404).json({ message: "lookupdetail not found" });
      }

      this.#log('success', `GET /lookupdetail/${id} - Petición exitosa`);
      res.json(lookupdetail);
    } catch (error) {
      this.#log('error', `GET /lookupdetail/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}