import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Detail } from './Detail';
import { User } from './User';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryColumn({
    type: 'varchar',
    length: '10',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Detail, (detail) => detail.order)
  detail: Detail;
}
