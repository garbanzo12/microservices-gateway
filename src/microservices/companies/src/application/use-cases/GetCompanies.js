//Caso de uso de obtener todas las companies
export class GetCompanies {
  constructor(CompanyRepositoryFindAll) {
    this.CompanyRepositoryFindAll = CompanyRepositoryFindAll;
  }

  async execute() {
    return await this.CompanyRepositoryFindAll.findAll();
  }
}
