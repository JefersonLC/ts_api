import { Category } from '../db/entities/Category';

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  photo: string;
  category: Category;
};

export type UpdateProduct = NewProduct;
