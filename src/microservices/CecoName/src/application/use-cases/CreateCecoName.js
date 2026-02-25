export class CreateCecoName {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(data) {
    // Validaciones mínimas (puedes moverlas al controlador si prefieres)
    if (!data.Cecocode?.trim()) {
      throw new Error("Cecocode es requerido");
    }
    if (!data.Name?.trim()) {
      throw new Error("Name es requerido");
    }

    return await this.repository.create(data);
  }
}