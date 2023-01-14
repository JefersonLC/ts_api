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

orderRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getOrders)
  .post(bodyValidator(createOrderSchema), createOrder);

orderRouter
  .route('/id/:id')
  .all(
    passport.authenticate('jwt', { session: false }),
    paramsValidator(getOrderSchema)
  )
  .get(getOrderById)
  .delete(deleteOrder);
