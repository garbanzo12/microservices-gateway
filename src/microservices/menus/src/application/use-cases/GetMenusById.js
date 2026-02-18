//Caso de uso de obtener un Employee por su Id
export class GetMenusById {
  constructor(MenusRepositoryById) {
    this.MenusRepositoryById = MenusRepositoryById;
  }

  async execute(id) {
    return await this.MenusRepositoryById.findById(id);
  }
}