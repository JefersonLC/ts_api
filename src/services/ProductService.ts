import fs from 'fs';
import boom from '@hapi/boom';
import ShortUniqueId from 'short-unique-id';
import { UpdateResult } from 'typeorm';
import { config } from '../config';
import { AppDataSource } from '../db';
import { Order } from '../db/entities/Order';
import { Product } from '../db/entities/Product';
import { NewProduct, UpdateProduct } from '../types/product';
import OrderService from './OrderService';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });
const orderService = new OrderService();

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

  async createProduct(
    data: NewProduct,
    image: Express.Multer.File
  ): Promise<Product> {
    const isDuplicated: Product | null = await this.isDuplicated(data);
    if (isDuplicated) {
      fs.unlinkSync(image.path);
      throw boom.conflict('The product is already registered');
    }
    const product = AppDataSource.getRepository(Product).create({
      id: uid(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      photo: `${config.domain}/public/images/products/${image.filename}`,
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

  async findByPrice(id: string) {
    const product: Product = await this.findById(id);
    const price = product.price;
    return price;
  }

  async findByIdOrDeleteOrder(id: string, order: Order) {
    const product: Product | null = await AppDataSource.getRepository(
      Product
    ).findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      await orderService.deleteOrder(order.id);
      throw boom.notFound('Product not found');
    }
    return product;
  }
}
