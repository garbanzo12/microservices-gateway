import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Employees', schema: 'dbo' })
export class EmployeeEntity {
  
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'nvarchar', length: 50 })
  DocumentNumber;

  @Column({ type: 'int' })
  DocumentType;

  @Column({ type: 'nvarchar', length: 255 })
  FullName;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Gender;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  MaritalStatus;

  @Column({ type: 'date', nullable: true })
  DateOfBirth;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  PlaceOfBirth;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  Phone1;

  @Column({ type: 'nvarchar', length: 20, nullable: true })
  Phone2;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Address;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Email;

  @Column({ type: 'int', nullable: true })
  Post;

  @Column({ type: 'int' })
  CompanyId;

  @Column({ type: 'int', nullable: true })
  EmployeeType;

  @Column({ type: 'int', nullable: true })
  OfficeId;

  @Column({ type: 'bit', nullable: true })
  Asset;

  @Column({ type: 'date', nullable: true })
  DateOfEntry;

  @Column({ type: 'date', nullable: true })
  CompletionDate;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  FirsName;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  LastName;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  CauseWithdrawal;

  @Column({ type: 'int', nullable: true })
  TypeOfContract;

  @Column({ type: 'int', nullable: true })
  IdCecoName;
}
