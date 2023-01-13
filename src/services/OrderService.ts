import boom from '@hapi/boom';
import ShortUniqueId from 'short-unique-id';
import { AppDataSource } from '../db';
import { Order } from '../db/entities/Order';
import { User } from '../db/entities/User';
import { NewOrder } from '../types/order';

const uid: ShortUniqueId = new ShortUniqueId({ length: 10 });

export default class OrderService {
  async findAll(): Promise<Order[]> {
    const orders: Order[] = await AppDataSource.getRepository(Order).find({
      select: {
        user: {
          id: true,
          name: true,
          lastname: true,
          email: true,
        },
        detail: {
          id: true,
          amount: true,
          unitPrice: true,
          totalPrice: true,
          product: {
            id: true,
            name: true,

          },
        },
      },
      relations: {
        user: true,
        detail: {
          product: true,
        },
      },
    });
    return orders;
  }

  async findById(id: string): Promise<Order> {
    const order: Order | null = await AppDataSource.getRepository(
      Order
    ).findOne({
      where: {
        id: id,
      },
      select: {
        user: {
          id: true,
          name: true,
          lastname: true,
          email: true,
        },
        detail: {
          id: true,
          amount: true,
          unitPrice: true,
          totalPrice: true,
          product: {
            id: true,
            name: true,
          },
        },
      },
      relations: {
        user: true,
        detail: {
          product: true,
        },
      },
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async createOrder(data: NewOrder, user: User): Promise<Order> {
    const order = AppDataSource.getRepository(Order).create({
      id: uid(),
      address: data.address,
      user: user,
    });
    const result: Order = await AppDataSource.getRepository(Order).save(order);
    return result;
  }

  async deleteOrder(id: string) {
    const order = await this.findById(id);
    const result: Order = await AppDataSource.getRepository(Order).remove(
      order
    );
    return result;
  }
}
