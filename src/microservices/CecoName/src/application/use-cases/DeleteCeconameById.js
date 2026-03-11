//Caso de uso de eliminar un cecoName por su Id
export class DeleteCeconameById {
  constructor(CecoNameRepositoryById) {
    this.CecoNameRepositoryById = CecoNameRepositoryById;
  }

  async execute(id) {
    return await this.CecoNameRepositoryById.delete(id);
  }
}