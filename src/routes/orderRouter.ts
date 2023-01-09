import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from '../controllers/OrderController';
import { createOrderSchema, getOrderSchema } from '../db/schemas/orderSchema';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const orderRouter: Router = Router();

orderRouter.get('/', getOrders);

orderRouter.post('/', bodyValidator(createOrderSchema), createOrder);

orderRouter.get('/id/:id', paramsValidator(getOrderSchema), getOrderById);

orderRouter.delete('/id/:id', paramsValidator(getOrderSchema), deleteOrder);
