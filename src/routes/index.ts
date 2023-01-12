import { Router } from 'express';
import passport from 'passport';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
// import { detailRouter } from './detailRouter';
import { authUser } from '../controllers/UserController';

export const apiRouter: Router = Router();

apiRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  authUser
);
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
// apiRouter.use('/details', detailRouter);
