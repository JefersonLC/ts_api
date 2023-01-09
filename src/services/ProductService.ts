import boom from '@hapi/boom';
import ShortUniqueId from 'short-unique-id';
import { UpdateResult } from 'typeorm';
import { AppDataSource } from '../db';
import { Product } from '../db/entities/Product';
import { NewProduct, UpdateProduct } from '../types/product';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });

export default class ProductService {
  async findAll(): Promise<Product[]> {
    const products: Product[] = await AppDataSource.getRepository(Product).find(
      {
        relations: {
          category: true,
        },
      }
    );
    return products;
  }

  async findById(id: string): Promise<Product> {
    const product: Product | null = await AppDataSource.getRepository(
      Product
    ).findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async isDuplicated({ name }: NewProduct): Promise<Product | null> {
    const product: Product | null = await AppDataSource.getRepository(
      Product
    ).findOneBy({
      name: name,
    });
    return product;
  }

  async createProduct(data: NewProduct): Promise<Product> {
    const isDuplicated: Product | null = await this.isDuplicated(data);
    if (isDuplicated) {
      throw boom.conflict('The product is already registered');
    }
    const product = AppDataSource.getRepository(Product).create({
      id: uid(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      photo: data.photo,
      category: data.category,
    });
    const result = await AppDataSource.getRepository(Product).save(product);
    return result;
  }

  async updateProduct(data: UpdateProduct, id: string): Promise<UpdateResult> {
    const product: Product = await this.findById(id);
    const result: UpdateResult = await AppDataSource.getRepository(
      Product
    ).update(product.id, data);
    return result;
  }

  async deleteProduct(id: string) {
    const product = await this.findById(id);
    const result: Product = await AppDataSource.getRepository(Product).remove(
      product
    );
    return result;
  }
}
