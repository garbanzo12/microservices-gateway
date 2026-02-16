//Logica de negocio
export class eContract {
  constructor({ id, idmeployee, contractstartdate,contrctenddate,idceconame,typeofcontract,createdat,creactedby,updateat,updateby }) {
    this.id = id
    this.idmeployee = idmeployee
    this.contractstartdate = contractstartdate
    this.contrctenddate = contrctenddate
    this.idceconame = idceconame
    this.typeofcontract = typeofcontract
    this.createdat = createdat
    this.creactedby = creactedby
    this.updateat = updateat
    this.updateby = updateby
  }
}