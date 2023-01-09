import { Order } from '../db/entities/Order';
import { Product } from '../db/entities/Product';

export type NewDetail = [
  {
    amount: number;
    unitPrice: number;
    totalPrice: number;
    order: Order;
    product: Product;
  }
];
