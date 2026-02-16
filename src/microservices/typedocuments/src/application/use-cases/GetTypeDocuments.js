//Caso de uso de obtener todas los Employees
export class GetTypeDocuments {
  constructor(TypeDocumentsRepositoryFindAll) {
    this.TypeDocumentsRepositoryFindAll = TypeDocumentsRepositoryFindAll;
  }

  async execute() {
    return await this.TypeDocumentsRepositoryFindAll.findAll();
  }
}
