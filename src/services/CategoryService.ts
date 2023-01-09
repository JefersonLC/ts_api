import boom from '@hapi/boom';
import ShortUniqueId from 'short-unique-id';
import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../db';
import { Category } from '../db/entities/Category';
import { NewCategory, UpdateCategory } from '../types/category';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });

export default class CategoryService {
  async findAll(): Promise<Category[]> {
    const categories: Category[] = await AppDataSource.getRepository(
      Category
    ).find({
      relations: {
        products: true,
      },
    });
    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category: Category | null = await AppDataSource.getRepository(
      Category
    ).findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async isDuplicated({ name }: NewCategory): Promise<Category | null> {
    const category: Category | null = await AppDataSource.getRepository(
      Category
    ).findOneBy({
      name: name,
    });
    return category;
  }

  async createCategory(data: NewCategory): Promise<Category> {
    const isDuplicated: Category | null = await this.isDuplicated(data);
    if (isDuplicated) {
      throw boom.conflict('The category is already registered');
    }
    const category = AppDataSource.getRepository(Category).create({
      id: uid(),
      name: data.name,
    });
    const result = await AppDataSource.getRepository(Category).save(category);
    return result;
  }

  async updateCategory(
    data: UpdateCategory,
    id: string
  ): Promise<UpdateResult> {
    const category = await this.findById(id);
    const result: UpdateResult = await AppDataSource.getRepository(
      Category
    ).update(category.id, data);
    return result;
  }

  async deleteCategory(id: string) {
    const category = await this.findById(id);
    const result: Category = await AppDataSource.getRepository(Category).remove(
      category
    );
    return result;
  }
}
