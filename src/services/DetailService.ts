import ShortUniqueId from 'short-unique-id';
import { InsertResult } from 'typeorm';
import { AppDataSource } from '../db';
import { Detail } from '../db/entities/Detail';
import { Order } from '../db/entities/Order';
import { NewOrder } from '../types/order';
import ProductService from './ProductService';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });
const productService = new ProductService();

export default class DetailService {
  async createDetail(data: NewOrder, order: Order) {
    const response = data.details.map(async (detail) => {
      const product = await productService.findByIdOrDeleteOrder(
        detail.product,
        order
      );
      return {
        id: uid(),
        amount: detail.amount,
        unitPrice: product.price,
        totalPrice: product.price * detail.amount,
        product: detail.product,
        order: order,
      };
    });

    const details = await Promise.all(response);

    const result: InsertResult = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Detail)
      .values(details)
      .execute();
    return result;
  }
}
