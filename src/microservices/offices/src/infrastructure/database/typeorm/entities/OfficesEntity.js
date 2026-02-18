import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Offices', schema: 'dbo' })
export class EmployeeEntity {
  
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'nvarchar', length: 50 })
  Name;

  @Column({ type: 'nvarchar', length: 255 })
  City;

  @Column({ type: 'int' })
  Active;


}
