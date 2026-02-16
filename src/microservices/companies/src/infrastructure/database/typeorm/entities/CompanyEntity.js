import { Entity, Column, PrimaryColumn } from 'typeorm';

// Se especifica la tabla con la que se va a trabajar (Companies) del schema dbo
@Entity({ name: 'Companies', schema: 'dbo' })
export class CompanyEntity {
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'nvarchar', length: 255 })
  Name;

  @Column({ type: 'int' })
  State;
}