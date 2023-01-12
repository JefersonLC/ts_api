import { User } from '../db/entities/User';

export type NewOrder = {
  address: string;
  details: [
    {
      amount: number;
      unitPrice: number;
      totalPrice: number;
      product: Product;
    }
  ];
};
