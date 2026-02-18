  //Caso de uso de obtener un Users por su Id
export class GetUsersById {
  constructor(UsersRepositoryById) {
    this.UsersRepositoryById = UsersRepositoryById;
  }

  async execute(UserId) {
    return await this.UsersRepositoryById.findById(UserId);
  }
}