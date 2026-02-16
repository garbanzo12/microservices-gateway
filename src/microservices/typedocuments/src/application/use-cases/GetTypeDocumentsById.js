//Caso de uso de obtener un Employee por su Id
export class GetTypeDocumentsById {
  constructor(TypeDocumentsRepositoryById) {
    this.TypeDocumentsRepositoryById = TypeDocumentsRepositoryById;
  }

  async execute(id) {
    return await this.TypeDocumentsRepositoryById.findById(id);
  }
}