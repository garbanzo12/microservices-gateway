//Caso de uso de obtener todas los employeeContract
export class GeteContracts {
  constructor(eContractsRepositoryFindAll) {
    this.eContractsRepositoryFindAll = eContractsRepositoryFindAll;
  }

  async execute() {
    return await this.eContractsRepositoryFindAll.findAll();
  }
}
