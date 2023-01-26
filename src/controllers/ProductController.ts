import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { Product } from '../db/entities/Product';
import ProductService from '../services/ProductService';
import { NewProduct, UpdateProduct } from '../types/product';

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
    const product: Product = await productService.findById(id);
    res.json(product);
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
    const image: Express.Multer.File | undefined = req.file;
    if (!image) {
      throw boom.badRequest('An image was expected');
    }
    const product = await productService.createProduct(data, image);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const data: UpdateProduct = req.body;
    const product = await productService.updateProduct(data, id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}
