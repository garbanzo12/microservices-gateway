import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TypeDocument', schema: 'dbo' })
export class TypeDocumentEntity {
  
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'nvarchar', length: 250 })
  TypeDocument;

  @Column({  type: 'nvarchar', length: 250 })
  Nomenclature;

  @Column({  type: 'int' })
  State;

  @Column({  type: 'int' })
  Father;

  @Column({  type: 'date' })
  CreatAt;

}
