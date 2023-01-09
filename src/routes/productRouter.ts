import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/ProductController';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../db/schemas/productSchema';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const productRouter: Router = Router();

productRouter.get('/', getProducts);

productRouter.post('/', bodyValidator(createProductSchema), createProduct);

productRouter.get('/id/:id', paramsValidator(getProductSchema), getProductById);

productRouter.patch(
  '/id/:id',
  paramsValidator(getProductSchema),
  bodyValidator(updateProductSchema),
  updateProduct
);

productRouter.delete(
  '/id/:id',
  paramsValidator(getProductSchema),
  deleteProduct
);
