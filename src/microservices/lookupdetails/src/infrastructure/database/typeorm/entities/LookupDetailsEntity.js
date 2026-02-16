import { Entity, Column, PrimaryColumn } from 'typeorm';

// Se especifica la tabla con la que se va a trabajar (CecoName) del schema dbo
@Entity({ name: 'LookupDetails', schema: 'dbo' })
export class LookupDetailsEntity  {
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'int' })
  EmployeeId;

  @Column({ type: 'nvarchar', length: 255 })
  Name;

  @Column({ type: 'int' })
  LookupGroupId;

  @Column({ type: 'int' })
  State;
  
  @Column({ type: 'datetime' })
  CreateAt;

  @Column({ type: 'nvarchar', length: 50, nullable: true  })
  Value;
}