import { Request, Response, NextFunction } from 'express';
import { Category } from '../db/entities/Category';
import CategoryService from '../services/CategoryService';
import { NewCategory, UpdateCategory } from '../types/category';

const categoryService = new CategoryService();

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const categories: Category[] = await categoryService.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const category: Category = await categoryService.findById(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: NewCategory = req.body;
    const category = await categoryService.createCategory(data);
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const data: UpdateCategory = req.body;
    const user = await categoryService.updateCategory(data, id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await categoryService.deleteCategory(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
