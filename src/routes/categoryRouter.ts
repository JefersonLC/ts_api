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
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const categoryRouter: Router = Router();

categoryRouter.get('/', getCategories);

categoryRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  bodyValidator(createCategorySchema),
  createCategory
);

categoryRouter.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getCategorySchema),
  getCategoryById
);

categoryRouter.patch(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getCategorySchema),
  bodyValidator(updateCategorySchema),
  updateCategory
);

categoryRouter.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getCategorySchema),
  deleteCategory
);
