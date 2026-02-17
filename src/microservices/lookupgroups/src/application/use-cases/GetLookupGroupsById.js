//Caso de uso de obtener un Employee por su Id
export class GetLookupGroupsById {
  constructor(GetLookupGroupsById) {
    this.GetLookupGroupsById = GetLookupGroupsById;
  }

  async execute(id) {
    return await this.GetLookupGroupsById.findById(id);
  }
}