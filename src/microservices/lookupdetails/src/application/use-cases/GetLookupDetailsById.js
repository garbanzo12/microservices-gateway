//Caso de uso de obtener un cecoName por su Id
export class GetLookupDetailsById {
  constructor(LookupDetailsRepositoryById) {
    this.LookupDetailsRepositoryById = LookupDetailsRepositoryById;
  }

  async execute(id) {
    return await this.LookupDetailsRepositoryById.findById(id);
  }
}