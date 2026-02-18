//Caso de uso de obtener todas los Employees
export class GetRoles {
  constructor(RolesRepositoryFindAll) {
    this.RolesRepositoryFindAll = RolesRepositoryFindAll;
  }

  async execute() {
    return await this.RolesRepositoryFindAll.findAll();
  }
}
