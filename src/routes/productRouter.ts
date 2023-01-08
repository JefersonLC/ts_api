import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../controllers/ProductController';
import {
  createProductSchema,
  getProductSchema,
} from '../db/schemas/productSchema';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const productRouter: Router = Router();

productRouter.get('/', getProducts);

productRouter.post('/', bodyValidator(createProductSchema), createProduct);

productRouter.get('/id/:id', paramsValidator(getProductSchema), getProductById);

// categoryRouter.patch(
//   '/id/:id',
//   paramsValidator(getCategorySchema),
//   bodyValidator(updateCategorySchema),
//   updateCategory
// );

// categoryRouter.delete(
//   '/id/:id',
//   paramsValidator(getCategorySchema),
//   deleteCategory
// );
