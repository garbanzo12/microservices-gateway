//Caso de uso de obtener todas los CecoName
export class GetLookupDetails {
  constructor(LookupDetailsRepositoryFindAll) {
    this.LookupDetailsRepositoryFindAll = LookupDetailsRepositoryFindAll;
  }

  async execute() {
    return await this.LookupDetailsRepositoryFindAll.findAll();
  }
}
