import { Router } from 'express';
import passport from 'passport';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';
import { authUser, verifyUserEmail } from '../controllers/UserController';
import { requestValidator } from '../middlewares/validator';
import { logInUserSchema } from '../db/schemas/userSchema';
import { request } from '../types/requestEnum';

export const apiRouter: Router = Router();

apiRouter.post(
  '/login',
  requestValidator(request.body, logInUserSchema),
  passport.authenticate('local', { session: false }),
  authUser
);
apiRouter.get('/verify', verifyUserEmail);
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
