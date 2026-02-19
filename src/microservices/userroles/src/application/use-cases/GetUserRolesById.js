//Caso de uso de obtener un Employee por su Id
export class GetUserRolesById {
  constructor(UserRolesRepositoryById) {
    this.UserRolesRepositoryById = UserRolesRepositoryById;
  }

  async execute(id) {
    return await this.UserRolesRepositoryById.findById(id);
  }
}