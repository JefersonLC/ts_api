import { Router } from 'express';
import passport from 'passport';
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
import { checkRole } from '../middlewares/auth';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const productRouter: Router = Router();

productRouter.get('/', getProducts);

productRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  bodyValidator(createProductSchema),
  createProduct
);

productRouter.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getProductSchema),
  getProductById
);

productRouter.patch(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getProductSchema),
  bodyValidator(updateProductSchema),
  updateProduct
);

productRouter.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getProductSchema),
  deleteProduct
);
