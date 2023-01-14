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

categoryRouter
  .route('/')
  .get(getCategories)
  .post(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    bodyValidator(createCategorySchema),
    createCategory
  );

categoryRouter
  .route('/id/:id')
  .get(paramsValidator(getCategorySchema), getCategoryById)
  .all(
    passport.authenticate('jwt', { session: false }),
    checkRole,
    paramsValidator(getCategorySchema)
  )
  .patch(bodyValidator(updateCategorySchema), updateCategory)
  .delete(deleteCategory);
