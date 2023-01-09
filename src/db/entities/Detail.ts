import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity({
  name: 'order_product_detail',
})
export class Detail {
  @PrimaryColumn({
    type: 'varchar',
    length: '10',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'double precision',
    nullable: false,
    name: 'unit_price',
  })
  unitPrice: number;

  @Column({
    type: 'double precision',
    nullable: false,
    name: 'total_price',
  })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.detail, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.detail, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
