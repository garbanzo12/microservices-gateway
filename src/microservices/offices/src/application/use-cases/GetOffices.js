//Caso de uso de obtener todas los Employees
export class GetOffices {
  constructor(OfficesRepositoryFindAll) {
    this.OfficesRepositoryFindAll = OfficesRepositoryFindAll;
  }

  async execute() {
    return await this.OfficesRepositoryFindAll.findAll();
  }
}
