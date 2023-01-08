import { Router } from 'express';
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
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const categoryRouter: Router = Router();

categoryRouter.get('/', getCategories);

categoryRouter.post('/', bodyValidator(createCategorySchema), createCategory);

categoryRouter.get(
  '/id/:id',
  paramsValidator(getCategorySchema),
  getCategoryById
);

categoryRouter.patch(
  '/id/:id',
  paramsValidator(getCategorySchema),
  bodyValidator(updateCategorySchema),
  updateCategory
);

categoryRouter.delete(
  '/id/:id',
  paramsValidator(getCategorySchema),
  deleteCategory
);
