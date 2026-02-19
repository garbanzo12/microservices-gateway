//Caso de uso de obtener un Employee por su Id
export class GetMenuRolesById {
  constructor(MenuRolesRepositoryById) {
    this.MenuRolesRepositoryById = MenuRolesRepositoryById;
  }

  async execute(id) {
    return await this.MenuRolesRepositoryById.findById(id);
  }
}