//Caso de uso de obtener una companie por su Id
export class GetDocumentPermissionsById {
  constructor(DocumentPermissionsRepositoryById) {
    this.DocumentPermissionsRepositoryById = DocumentPermissionsRepositoryById;
  }

  async execute(id) {
    return await this.DocumentPermissionsRepositoryById.findById(id);
  }
}