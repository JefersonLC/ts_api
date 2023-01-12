import { Request, Response, NextFunction } from 'express';
import { Order } from '../db/entities/Order';
import { User } from '../db/entities/User';
import DetailService from '../services/DetailService';
import OrderService from '../services/OrderService';
import { NewOrder } from '../types/order';

const orderService = new OrderService();
const detailService = new DetailService();

export async function getOrders(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orders: Order[] = await orderService.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const order: Order = await orderService.findById(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function createOrder(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: NewOrder = req.body;
    const user: User = req.user.user;
    const order: Order = await orderService.createOrder(data, user);
    await detailService.createDetail(data, order);
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const order = await orderService.deleteOrder(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
}
