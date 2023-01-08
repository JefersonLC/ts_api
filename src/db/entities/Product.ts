import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './Category';
import { ProductOrder } from './ProductOrder';

@Entity()
export class Product {
  @PrimaryColumn({
    type: 'varchar',
    length: '10',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: '20',
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'double precision',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'varchar',
    length: '150',
    nullable: true,
  })
  photo: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  detail: ProductOrder;
}
