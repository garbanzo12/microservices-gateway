//Caso de uso de obtener todas los MenuRoles
export class GetMenuRoles {
  constructor(MenuRolesRepositoryFindAll) {
    this.MenuRolesRepositoryFindAll = MenuRolesRepositoryFindAll;
  }

  async execute() {
    return await this.MenuRolesRepositoryFindAll.findAll();
  }
}
