import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'MenuRoles', schema: 'dbo' })
export class RolesEntity {
  
  @PrimaryColumn({ type: 'int' })
  MenuRolId;

  @Column({ type: 'int'  })
  RoleId;

  @Column({ type: 'int'  })
  MenuId;

  @Column({ type: 'int' })
  State;


}
