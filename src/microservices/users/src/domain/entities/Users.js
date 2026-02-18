// Logica de negocio
export class Users {
  constructor({UserId,Name,Document,UserName,Password,Email,State,AuditCreateUser,CreatedAt}) {
    this.UserId =  UserId
    this.Name =  Name
    this.Document  =  Document
    this.UserName = UserName
    this.Password = Password
    this.Email = Email
    this.State = State
    this.AuditCreateUser = AuditCreateUser
    this.CreatedAt = CreatedAt
 
  }
}
