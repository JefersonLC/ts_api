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

productRouter
  .route('/')
  .get(getProducts)
  .post(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    bodyValidator(createProductSchema),
    createProduct
  );

productRouter
  .route('/id/:id')
  .get(paramsValidator(getProductSchema), getProductById)
  .all(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    paramsValidator(getProductSchema)
  )
  .patch(bodyValidator(updateProductSchema), updateProduct)
  .delete(deleteProduct);
