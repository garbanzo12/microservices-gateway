//Caso de uso de obtener todas los Employees
export class GetEmployees {
  constructor(EmployeesRepositoryFindAll) {
    this.EmployeesRepositoryFindAll = EmployeesRepositoryFindAll;
  }

  async execute() {
    return await this.EmployeesRepositoryFindAll.findAll();
  }
}
