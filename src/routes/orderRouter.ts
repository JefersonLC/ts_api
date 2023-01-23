import { Router } from 'express';
import passport from 'passport';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from '../controllers/OrderController';
import { createOrderSchema, getOrderSchema } from '../db/schemas/orderSchema';
import { requestValidator } from '../middlewares/validator';
import { request } from '../types/requestEnum';

export const orderRouter: Router = Router();

orderRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getOrders)
  .post(requestValidator(request.body, createOrderSchema), createOrder);

orderRouter
  .route('/id/:id')
  .all(
    passport.authenticate('jwt', { session: false }),
    requestValidator(request.params, getOrderSchema)
  )
  .get(getOrderById)
  .delete(deleteOrder);
