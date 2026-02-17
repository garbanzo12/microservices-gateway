import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'LookupGroups', schema: 'dbo' })
export class LookupGroupsEntity {
  
  @PrimaryColumn({ type: 'int' })
  Id;

  @Column({ type: 'nvarchar', length: 250 })
  Name;

  @Column({  type: 'int' })
  State;

  @Column({  type: 'date' })
  CreateAt;

}
