//Caso de uso de obtener un Employee por su Id
export class GetRolesById {
  constructor(RolesRepositoryById) {
    this.RolesRepositoryById = RolesRepositoryById;
  }

  async execute(id) {
    return await this.RolesRepositoryById.findById(id);
  }
}