//Caso de uso de obtener todas los Employees
export class GetTypeLookupGroups {
  constructor(LookupGroupsRepositoryFindAll) {
    this.LookupGroupsRepositoryFindAll = LookupGroupsRepositoryFindAll;
  }

  async execute() {
    return await this.LookupGroupsRepositoryFindAll.findAll();
  }
}
