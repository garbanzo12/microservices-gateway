//Logica de negocio
export class DocumentPermissions {
  constructor({ Id, UsuarId, TypeDocumentId,Visualize,Eliminate,Upload,CreatedAt }) {
    this.Id = Id
    this.UsuarId = UsuarId
    this.TypeDocumentId = TypeDocumentId
    this.Visualize = Visualize
    this.Eliminate = Eliminate
    this.Upload = Upload
    this.CreatedAt = CreatedAt
  }
}