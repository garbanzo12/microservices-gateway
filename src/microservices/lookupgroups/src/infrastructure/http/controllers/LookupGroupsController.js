import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class LookupGroupsController {
  constructor(getLookupGroupsUseCase, getLookupGroupsByIdUseCase) {
    this.getLookupGroupsUseCase = getLookupGroupsUseCase;
    this.getLookupGroupsByIdUseCase = getLookupGroupsByIdUseCase;
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
      [7:26:50 a. m.] ✅ GET /lookupgroup - Petición exitosa {"count":4}
      [7:26:53 a. m.] ✅ GET /lookupgroup/1 - Petición exitosa 
      [7:27:38 a. m.] ❌ GET /lookupgroup/0 - No encontrado 
  */
  
  getAll = async (req, res) => {
    try {
      const lookupgroups = await this.getLookupGroupsUseCase.execute();
      
      if (!lookupgroups || lookupgroups.length === 0) {
        this.#log('error', 'GET /lookupgroup - No se encontraron registros');
        return res.status(404).json({ message: "lookupgroups not found" });
      }

      this.#log('success', 'GET /lookupgroup - Petición exitosa', { count: lookupgroups.length });
      res.json(lookupgroups);
    } catch (error) {
      this.#log('error', 'GET /lookupgroup - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const lookupgroup = await this.getLookupGroupsByIdUseCase.execute(id);

      if (!lookupgroup) {
        this.#log('error', `GET /lookupgroup/${id} - No encontrado`);
        return res.status(404).json({ message: "lookupgroup not found" });
      }

      this.#log('success', `GET /lookupgroup/${id} - Petición exitosa`);
      res.json(lookupgroup);
    } catch (error) {
      this.#log('error', `GET /lookupgroup/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}