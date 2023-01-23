import { Router } from 'express';
import passport from 'passport';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/CategoryController';
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../db/schemas/categorySchema';
import { checkRole } from '../middlewares/auth';
import { requestValidator } from '../middlewares/validator';
import { request } from '../types/requestEnum';

export const categoryRouter: Router = Router();

categoryRouter
  .route('/')
  .get(getCategories)
  .post(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    requestValidator(request.body, createCategorySchema),
    createCategory
  );

categoryRouter
  .route('/id/:id')
  .get(requestValidator(request.params, getCategorySchema), getCategoryById)
  .all(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    requestValidator(request.params, getCategorySchema)
  )
  .patch(requestValidator(request.body, updateCategorySchema), updateCategory)
  .delete(deleteCategory);
