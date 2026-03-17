//Caso de uso de eliminar un cecoName por su Id
export class DeleteEcontractById {
  constructor(eEcontractRepositoryById) {
    this.eEcontractRepositoryById = eEcontractRepositoryById;
  }

  async execute(id) {
    return await this.eEcontractRepositoryById.delete(id);
  }
}