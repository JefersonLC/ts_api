import { Category } from '../db/entities/Category';

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
};

export type UpdateProduct = NewProduct;
