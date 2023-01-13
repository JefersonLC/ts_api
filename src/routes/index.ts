import { Router } from 'express';
import passport from 'passport';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
import { authUser } from '../controllers/UserController';
import { bodyValidator } from '../middlewares/validator';
import { logInUserSchema } from '../db/schemas/userSchema';

export const apiRouter: Router = Router();

apiRouter.post(
  '/login',
  bodyValidator(logInUserSchema),
  passport.authenticate('local', { session: false }),
  authUser
);
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
