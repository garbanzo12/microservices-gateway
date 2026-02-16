import { Entity, Column, PrimaryColumn } from 'typeorm';

// Se especifica la tabla con la que se va a trabajar (EmployeeContracts) del schema dbo
@Entity({ name: 'EmployeeContracts', schema: 'dbo' })
export class eContractEntity {
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'int' })
  IdEmployee;

  @Column({ type: 'date', nullable: true})
  ContractStartDate;
  
  @Column({ type: 'date',  nullable: true })
  ContractEndDate;

  @Column({ type: 'int' })
  IdCecoName;

  @Column({ type: 'int' })
  TypeOfContract;

  @Column({ type: 'datetime' })
  CreatedAt;

  @Column({ type: 'int' })
  CreatedBy;

  @Column({ type: 'datetime' })
  UpdatedAt;

  @Column({ type: 'int' })
  UpdatedBy;
}