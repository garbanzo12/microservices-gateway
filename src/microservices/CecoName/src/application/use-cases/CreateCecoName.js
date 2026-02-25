//Caso de uso de Crear un cecoName 
export class CreateCecoName {
  constructor(CecoNameRepositoryCreate) {
    this.CecoNameRepositoryCreate = CecoNameRepositoryCreate;
  }

  async execute(data) {
    return await this.CecoNameRepositoryCreate.Create(data);
  }
}