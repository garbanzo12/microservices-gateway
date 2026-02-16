//Caso de uso de obtener un Employee por su Id
export class GetEmployeeById {
  constructor(EmployeeRepositoryById) {
    this.EmployeeRepositoryById = EmployeeRepositoryById;
  }

  async execute(id) {
    return await this.EmployeeRepositoryById.findById(id);
  }
}