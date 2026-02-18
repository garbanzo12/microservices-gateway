//Caso de uso de obtener un Employee por su Id
export class GetOfficesById {
  constructor(OfficesRepositoryById) {
    this.OfficesRepositoryById = OfficesRepositoryById;
  }

  async execute(id) {
    return await this.OfficesRepositoryById.findById(id);
  }
}