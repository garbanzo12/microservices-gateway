import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class eContractController {
  constructor(getAlleContractsUseCase, geteContractsByIdUseCase, CreateContractsUseCase) {
    this.getAlleContractsUseCase = getAlleContractsUseCase;
    this.geteContractsByIdUseCase = geteContractsByIdUseCase;
    this.CreateContractsUseCase = CreateContractsUseCase;
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
      [11:09:13 a. m.] ✅ GET /eContract/23873 - Petición exitosa 
      [11:09:18 a. m.] ✅ GET /eContract - Petición exitosa {"count":23868}
      [11:11:15 a. m.] ❌ GET /eContract/9999999 - No encontrado 
  */
  
  getAll = async (req, res) => {
    try {
      const eContracts = await this.getAlleContractsUseCase.execute();
      
      if (!eContracts || eContracts.length === 0) {
        this.#log('error', 'GET /eContract - No se encontraron registros');
        return res.status(404).json({ message: "eContracts not found" });
      }

      this.#log('success', 'GET /eContract - Petición exitosa', { count: eContracts.length });
      res.json(eContracts);
    } catch (error) {
      this.#log('error', 'GET /eContract - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const eContract = await this.geteContractsByIdUseCase.execute(id);

      if (!eContract) {
        this.#log('error', `GET /eContract/${id} - No encontrado`);
        return res.status(404).json({ message: "eContract not found" });
      }

      this.#log('success', `GET /eContract/${id} - Petición exitosa`);
      res.json(eContract);
    } catch (error) {
      this.#log('error', `GET /eContract/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  
  create = async (req, res) => {
  try {
    const created = await this.CreateContractsUseCase.execute(req.body);
    console.log(created)
    if (!created) {
      this.#log('error', `POST /eContract - No se pudo crear el registro`);
      return res.status(400).json({ message: "No se pudo crear el CecoName" });
    }

    this.#log('success', `POST /eContract - Creado exitosamente - ID: ${created.Id}`);
    res.status(201).json(created);
  } catch (error) {
    this.#log('error', `POST /eContract - Error`, error.message);
    res.status(500).json({ message: "Error interno al crear CecoName" });
  }
}
}