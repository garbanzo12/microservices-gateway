import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class CecoNameController {
  constructor(getCecoNameUseCase, getCecoNameByIdUseCase,createCecoNameUseCase,deleteCeconameById ) {
    this.getCecoNameUseCase = getCecoNameUseCase;
    this.getCecoNameByIdUseCase = getCecoNameByIdUseCase;
    this.createUseCase = createCecoNameUseCase;
    this.deleteCeconameById = deleteCeconameById;
  }

  // Este es un helper para centralizar el formato del log
#log(type, message, data = '') {
  const time = new Date().toLocaleTimeString('es-CO', { timeStyle: 'short' });
  
  const icons = {
    success : '✅',
    error   : '❌',
    warn    : '⚠️',
    info    : 'ℹ️'
  };

  const colors = {
    success : pc.green,
    error   : pc.red,
    warn    : pc.yellow,
    info    : pc.blue
  };

  const icon = icons[type] || '•';
  const colorFn = colors[type] || pc.white;

  console.log(
    `${pc.gray(`[${time}]`)} ${colorFn(icon)} ${pc.bold(message)}`,
    data ? pc.dim(` ${JSON.stringify(data)}`) : ''
  );
} /* Ejemplos de este log
      ([hora] [icono] [Tipo petición] [endpoint] - [Respuesta] )
      [2:04:04 p. m.] ✅ GET /ceconame/1 - Petición exitosa 
      [2:04:13 p. m.] ❌ GET /ceconame/200 - No encontrado 
      [2:04:23 p. m.] ✅ GET /ceconame - Petición exitosa {"count":178}
  */
  
  getAll = async (req, res) => {
    try {
      const ceconames = await this.getCecoNameUseCase.execute();
      
      if (!ceconames || ceconames.length === 0) {
        this.#log('error', 'GET /ceconame - No se encontraron registros');
        return res.status(404).json({ message: "ceconames not found" });
      }

      this.#log('success', 'GET /ceconame - Petición exitosa', { count: ceconames.length });
      res.json(ceconames);
    } catch (error) {
      this.#log('error', 'GET /ceconame - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const ceconame = await this.getCecoNameByIdUseCase.execute(id);

      if (!ceconame) {
        this.#log('error', `GET /ceconame/${id} - No encontrado`);
        return res.status(404).json({ message: "Ceconame not found" });
      }

      this.#log('success', `GET /ceconame/${id} - Petición exitosa`);
      res.json(ceconame);
    } catch (error) {
      this.#log('error', `GET /ceconame/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  create = async (req, res) => {
  try {
    const created = await this.createUseCase.execute(req.body);

    if (!created) {
      this.#log('error', `POST /ceconame - No se pudo crear el registro`);
      return res.status(400).json({ message: "No se pudo crear el CecoName" });
    }

    this.#log('success', `POST /ceconame - Creado exitosamente - ID: ${created.Id}`);
    res.status(201).json(created);
  } catch (error) {
    this.#log('error', `POST /ceconame - Error`, error.message);
    res.status(500).json({ message: "Error interno al crear CecoName" });
  }
}


delete = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Validación básica del ID
    if (isNaN(id) || id <= 0) {
      this.#log('warn', `DELETE /ceconame/${req.params.id} - ID inválido`);
      return res.status(400).json({ message: "El ID debe ser un número entero positivo" });
    }

    const deleted = await this.deleteCeconameById.execute(id);

    if (!deleted) {
      this.#log('warn', `DELETE /ceconame/${id} - No encontrado`);
      return res.status(404).json({ message: "CecoName no encontrado" });
    }

    this.#log(
      'success',
      `DELETE /ceconame/${id} - Eliminado exitosamente`,
      {
        Id: deleted.Id,
        Cecocode: deleted.Cecocode,
        Name: deleted.Name,
        State: !!deleted.State,           
        CreatedBy: deleted.CreatedBy,
        CreatedAt: deleted.CreatedAt?.toISOString?.() || deleted.CreatedAt,
        UpdatedBy: deleted.UpdatedBy,
        UpdateAt: deleted.UpdateAt?.toISOString?.() || deleted.UpdateAt
      }
    );
    res.status(204).json(deleted);
  } catch (error) {
    this.#log('error', `DELETE /ceconame/${req.params.id || 'unknown'} - Error`, error.message);
    res.status(500).json({ message: "Error interno al eliminar CecoName" });
  }
};
}