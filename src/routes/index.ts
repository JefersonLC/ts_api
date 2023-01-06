import { Router } from 'express';
import { userRouter } from './userRouter';

export const apiRouter: Router = Router();

apiRouter.use('/users', userRouter);
