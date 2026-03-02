export class CreateEmployees {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(data) {
    console.log(data)
    return await this.repository.create(data);
  }
}