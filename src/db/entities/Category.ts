import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity({
  name: 'categories',
})
export class Category {
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

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
