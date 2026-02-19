//Caso de uso de obtener todas los Employees
export class GetUserRoles {
  constructor(UserRolesRepositoryFindAll) {
    this.UserRolesRepositoryFindAll = UserRolesRepositoryFindAll;
  }

  async execute() {
    return await this.UserRolesRepositoryFindAll.findAll();
  }
}
