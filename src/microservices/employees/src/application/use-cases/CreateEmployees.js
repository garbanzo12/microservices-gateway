export class CreateEmployees {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(data) {
    return await this.repository.create(data);
  }
}