import { Router } from 'express';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
import { detailRouter } from './detailRouter';

export const apiRouter: Router = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/details', detailRouter);
