import { Entity, Column, PrimaryColumn } from 'typeorm';

// Se especifica la tabla con la que se va a trabajar (Companies) del schema dbo
@Entity({ name: 'DocumentPermissions', schema: 'dbo' })
export class CompanyEntity {
  @PrimaryColumn({ type: 'int' })
  UsuarId;

  @Column({ type: 'int' })
  TypeDocumentId;

  @Column({ type: 'nvarchar', length: 255 })
  Visualize;
  
  @Column({ type: 'nvarchar', length: 255 })
  Eliminate;

  @Column({ type: 'nvarchar', length: 255 })
  Upload;

  @Column({ type: 'datetime' })
  CreatedAt;
}