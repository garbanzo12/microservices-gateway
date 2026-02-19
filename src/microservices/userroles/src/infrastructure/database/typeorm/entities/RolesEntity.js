import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'UserRoles', schema: 'dbo' })
export class RolesEntity {
  
  @PrimaryColumn({ type: 'int' })
  UserRoleId;

  @Column({ type: 'int'  })
  RoleId;

  @Column({ type: 'int'  })
  UserId;

  @Column({ type: 'int' })
  State;


}
