import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class TypeDocumentController {
  constructor(getTypeDocumentUseCase, getTypeDocumentByIdUseCase) {
    this.getTypeDocumentUseCase = getTypeDocumentUseCase;
    this.getTypeDocumentByIdUseCase = getTypeDocumentByIdUseCase;
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
      [7:26:33 a. m.] ✅ GET /typedocument - Petición exitosa {"count":35}
      [7:26:42 a. m.] ✅ GET /typedocument/1 - Petición exitosa
      [7:27:03 a. m.] ❌ GET /typedocument/0 - No encontrado 
  */
  
  getAll = async (req, res) => {
    try {
      const typedocuments = await this.getTypeDocumentUseCase.execute();
      
      if (!typedocuments || typedocuments.length === 0) {
        this.#log('error', 'GET /typedocument - No se encontraron registros');
        return res.status(404).json({ message: "typedocuments not found" });
      }

      this.#log('success', 'GET /typedocument - Petición exitosa', { count: typedocuments.length });
      res.json(typedocuments);
    } catch (error) {
      this.#log('error', 'GET /typedocument - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const typedocument = await this.getTypeDocumentByIdUseCase.execute(id);

      if (!typedocument) {
        this.#log('error', `GET /typedocument/${id} - No encontrado`);
        return res.status(404).json({ message: "typedocument not found" });
      }

      this.#log('success', `GET /typedocument/${id} - Petición exitosa`);
      res.json(typedocument);
    } catch (error) {
      this.#log('error', `GET /typedocument/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}