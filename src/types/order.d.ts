import { User } from '../db/entities/User';

export type NewOrder = {
  address: string;
  details: [
    {
      amount: number;
      product: Product;
    }
  ];
};
