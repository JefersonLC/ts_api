import { Router } from 'express';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';

export const apiRouter: Router = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
