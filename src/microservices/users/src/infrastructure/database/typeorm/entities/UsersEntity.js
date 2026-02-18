  import { Entity, Column, PrimaryColumn } from 'typeorm';

  @Entity({ name: 'Users', schema: 'dbo' })
  export class UsersEntity {
    
    @PrimaryColumn({ type: 'int' })
    UserId;

    @Column({ type: 'nvarchar', length: 150 })
    Name;

    @Column({ type: 'nvarchar' , length: 20 })
    Document;
    
    @Column({ type: 'nvarchar', length: 50 })
    UserName;

    @Column({ type: 'nvarchar', length: 50 })
    Password;

    @Column({ type: 'nvarchar', length: 150 })
    Email;

    @Column({ type: 'int' })
    State;

    @Column({ type: 'int' })
    AuditCreateUser;

    @Column({ type: 'datetime' })
    CreatedAt;
    
  }
