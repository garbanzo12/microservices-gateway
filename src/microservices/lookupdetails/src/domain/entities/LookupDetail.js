// Logica de negocio
export class LookupDetail {
  constructor({
    Id,
    Name,
    LookupGroupId,
    State,
    CreateAt,
    Value
  }) {
    this.Id = Id;
    this.Name = Name;
    this.LookupGroupId = LookupGroupId;
    this.State = State;
    this.CreateAt = CreateAt;
    this.Value = Value;
  }
}
