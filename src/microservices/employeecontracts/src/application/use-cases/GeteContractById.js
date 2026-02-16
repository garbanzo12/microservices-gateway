//Caso de uso de obtener un employeeContract por su Id
export class GeteContractsById {
  constructor(eContractRepositoryById) {
    this.eContractRepositoryById = eContractRepositoryById;
  }

  async execute(id) {
    return await this.eContractRepositoryById.findById(id);
  }
}