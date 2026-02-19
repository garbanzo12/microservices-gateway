import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class DocumentPermissionsController {
  constructor(getAllDocumentPermissionsUseCase, getDocumentPermissionsByIdUseCase) {
    this.getAllDocumentPermissionsUseCase = getAllDocumentPermissionsUseCase;
    this.getDocumentPermissionsByIdUseCase = getDocumentPermissionsByIdUseCase;
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
      const documentpermission = await this.getAllDocumentPermissionsUseCase.execute();
      
      if (!documentpermission || documentpermission.length === 0) {
        this.#log('error', 'GET /documentpermissions - No se encontraron registros');
        return res.status(404).json({ message: "documentpermission not found" });
      }

      this.#log('success', 'GET /documentpermissions - Petición exitosa', { count: documentpermission.length });
      res.json(documentpermission);
    } catch (error) {
      this.#log('error', 'GET /documentpermissions - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const documentpermissions = await this.getDocumentPermissionsByIdUseCase.execute(id);

      if (!documentpermissions) {
        this.#log('error', `GET /documentpermissions/${id} - No encontrado`);
        return res.status(404).json({ message: "documentpermissions not found" });
      }

      this.#log('success', `GET /documentpermissions/${id} - Petición exitosa`);
      res.json(documentpermissions);
    } catch (error) {
      this.#log('error', `GET /documentpermissions/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}