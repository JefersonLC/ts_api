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
import { requestValidator } from '../middlewares/validator';
import { request } from '../types/requestEnum';

export const productRouter: Router = Router();

productRouter
  .route('/')
  .get(getProducts)
  .post(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    requestValidator(request.body, createProductSchema),
    createProduct
  );

productRouter
  .route('/id/:id')
  .get(requestValidator(request.params, getProductSchema), getProductById)
  .all(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    requestValidator(request.params, getProductSchema)
  )
  .patch(requestValidator(request.body, updateProductSchema), updateProduct)
  .delete(deleteProduct);
