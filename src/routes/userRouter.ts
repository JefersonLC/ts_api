import { Router, Request, Response, NextFunction } from 'express';
import { createUser } from '../db/schemas/userSchema';
import { boomError } from '../middlewares/errors';
import { bodyValidator } from '../middlewares/validator';
import UserService from '../services/UserService';
import { NewUser } from '../types/user';

export const userRouter: Router = Router();

const user = new UserService();

userRouter.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({
    xd: 'xd',
  });
});

userRouter.post(
  '/',
  bodyValidator(createUser),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: NewUser = req.body;
      const newUser = await user.create(data);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.use(boomError);
