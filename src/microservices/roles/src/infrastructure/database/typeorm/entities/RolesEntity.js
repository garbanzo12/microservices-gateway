import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Roles', schema: 'dbo' })
export class RolesEntity {
  
  @PrimaryColumn({ type: 'int' })
  RoleId;

  @Column({ type: 'nvarchar', length: 255  })
  Description;

  @Column({ type: 'int' })
  State;


}
