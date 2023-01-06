import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUsersById,
} from '../controllers/UserController';
import { createUserSchema, getUserSchema } from '../db/schemas/userSchema';
import { boomError } from '../middlewares/errors';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const userRouter: Router = Router();

userRouter.get('/', getUsers);

userRouter.post('/', bodyValidator(createUserSchema), createUser);

userRouter.get('/:id', paramsValidator(getUserSchema), getUsersById);

userRouter.use(boomError);
