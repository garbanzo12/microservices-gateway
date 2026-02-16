import pc from 'picocolors'; // Esta es una librería ligera de colores para colorear los codigos de respuesta (200, 400, etc)

export class CompanyController {
  constructor(getAllCompaniesUseCase, getCompaniesByIdUseCase) {
    this.getAllCompaniesUseCase = getAllCompaniesUseCase;
    this.getCompaniesByIdUseCase = getCompaniesByIdUseCase;
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
      [10:43:46 a. m.] ✅ GET /companies/1 - Petición exitosa 
      [10:43:54 a. m.] ❌ GET /companies/11 - No encontrado 
      [10:44:05 a. m.] ✅ GET /companies - Petición exitosa {"count":3}
  */
  
  getAll = async (req, res) => {
    try {
      const companies = await this.getAllCompaniesUseCase.execute();
      
      if (!companies || companies.length === 0) {
        this.#log('error', 'GET /companies - No se encontraron registros');
        return res.status(404).json({ message: "Companies not found" });
      }

      this.#log('success', 'GET /companies - Petición exitosa', { count: companies.length });
      res.json(companies);
    } catch (error) {
      this.#log('error', 'GET /companies - Error crítico', error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const company = await this.getCompaniesByIdUseCase.execute(id);

      if (!company) {
        this.#log('error', `GET /companies/${id} - No encontrado`);
        return res.status(404).json({ message: "Company not found" });
      }

      this.#log('success', `GET /companies/${id} - Petición exitosa`);
      res.json(company);
    } catch (error) {
      this.#log('error', `GET /companies/${id} - Error`, error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}