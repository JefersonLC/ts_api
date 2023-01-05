import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: '10',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: '50',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: true,
  })
  photo: string;

  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
  })
  token: string;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
    name: 'is_admin',
  })
  isAdmin: boolean;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  verified: boolean;
}
