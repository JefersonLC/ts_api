import { Router } from 'express';
import passport from 'passport';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from '../controllers/OrderController';
import { createOrderSchema, getOrderSchema } from '../db/schemas/orderSchema';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const orderRouter: Router = Router();

orderRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getOrders
);

orderRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  bodyValidator(createOrderSchema),
  createOrder
);

orderRouter.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getOrderSchema),
  getOrderById
);

orderRouter.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getOrderSchema),
  deleteOrder
);
