//Caso de uso de obtener todas los Employees
export class GetUsers {
  constructor(UsersRepositoryFindAll) {
    this.UsersRepositoryFindAll = UsersRepositoryFindAll;
  }

  async execute() {
    return await this.UsersRepositoryFindAll.findAll();
  }
}
