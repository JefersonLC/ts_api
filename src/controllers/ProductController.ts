import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/entities/Product';
import ProductService from '../services/ProductService';
import { NewProduct } from '../types/product';

const productService = new ProductService();

export async function getProducts(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products: Product[] = await productService.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const products: Product | null = await productService.findById(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: NewProduct = req.body;
    const product = await productService.createProduct(data);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

// export async function updateCategory(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const { id } = req.params;
//     const data: UpdateCategory = req.body;
//     const user = await categoryService.updateCategory(data, id);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }

// export async function deleteCategory(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { id } = req.params;
//     const user = await categoryService.deleteCategory(id);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }
