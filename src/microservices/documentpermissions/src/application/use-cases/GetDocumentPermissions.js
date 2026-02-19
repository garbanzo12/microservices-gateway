//Caso de uso de obtener todas las DocumentPermissions
export class GetDocumentPermissions{
  constructor(DocumentPermissionsRepositoryFindAll) {
    this.DocumentPermissionsRepositoryFindAll = DocumentPermissionsRepositoryFindAll;
  }

  async execute() {
    return await this.DocumentPermissionsRepositoryFindAll.findAll();
  }
}
