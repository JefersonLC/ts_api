// import boom from '@hapi/boom';
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
  // async findById(id: string): Promise<Detail> {
  //   const detail: Detail | null = await AppDataSource.getRepository(
  //     Detail
  //   ).findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!detail) {
  //     throw boom.notFound('Detail not found');
  //   }
  //   return detail;
  // }

  async createDetail(data: NewOrder, order: Order) {
    const response = data.details.map(async (detail) => {
      const product = await productService.findById(detail.product);
      return {
        id: uid(),
        amount: detail.amount,
        unitPrice: product.price,
        totalPrice: product.price * detail.amount,
        order: order,
        product: detail.product,
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

  // async deleteDetail(id: string) {
  //   const detail = await this.findById(id);
  //   const result: Detail = await AppDataSource.getRepository(Detail).remove(
  //     detail
  //   );
  //   return result;
  // }
}
