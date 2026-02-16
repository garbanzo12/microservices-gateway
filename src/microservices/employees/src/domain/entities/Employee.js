// Logica de negocio
export class Employee {
  constructor({Id,DocumentNumber,DocumentType,    FullName,    Gender,    MaritalStatus,
    DateOfBirth,    PlaceOfBirth,    Phone1,    Phone2,    Address,    Email,    Post,    CompanyId,    EmployeeType,    OfficeId,    Asset,    DateOfEntry,    CompletionDate,    FirsName,    LastName,   CauseWithdrawal,    TypeOfContract,
    IdCecoName,  }) {
    this.Id = Id
    this.DocumentNumber = DocumentNumber
    this.DocumentType = DocumentType
    this.FullName = FullName
    this.Gender = Gender
    this.MaritalStatus = MaritalStatus
    this.DateOfBirth = DateOfBirth
    this.PlaceOfBirth = PlaceOfBirth
    this.Phone1 = Phone1
    this.Phone2 = Phone2
    this.Address = Address
    this.Email = Email
    this.Post = Post
    this.CompanyId = CompanyId
    this.EmployeeType = EmployeeType
    this.OfficeId = OfficeId
    this.Asset = Asset
    this.DateOfEntry = DateOfEntry
    this.CompletionDate = CompletionDate
    this.FirsName = FirsName
    this.LastName = LastName
    this.CauseWithdrawal = CauseWithdrawal
    this.TypeOfContract = TypeOfContract
    this.IdCecoName = IdCecoName
  }
}
