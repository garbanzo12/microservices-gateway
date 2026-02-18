import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Menus', schema: 'dbo' })
export class MenuseEntity {
  
  @PrimaryColumn({ type: 'int' })
  MenuId;

  @Column({ type: 'nvarchar', length: 255  })
  Name;

  @Column({ type: 'nvarchar', length: 255 })
  Icon;

  @Column({ type: 'nvarchar', length: 255  })
  URL;

  @Column({ type: 'int' })
  FatherId;

  @Column({ type: 'int' })
  State;


}
