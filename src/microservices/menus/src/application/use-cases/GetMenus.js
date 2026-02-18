//Caso de uso de obtener todas los Employees
export class GetMenus {
  constructor(MenusRepositoryFindAll) {
    this.MenusRepositoryFindAll = MenusRepositoryFindAll;
  }

  async execute() {
    return await this.MenusRepositoryFindAll.findAll();
  }
}
