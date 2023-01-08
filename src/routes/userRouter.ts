import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  deleteUser,
} from '../controllers/UserController';
import {
  createUserSchema,
  getUserByRoleSchema,
  getUserSchema,
  updateUserSchema,
} from '../db/schemas/userSchema';
import { bodyValidator, paramsValidator } from '../middlewares/validator';

export const userRouter: Router = Router();

userRouter.get('/', getUsers);

userRouter.post('/', bodyValidator(createUserSchema), createUser);

userRouter.get('/id/:id', paramsValidator(getUserSchema), getUserById);

userRouter.patch(
  '/id/:id',
  paramsValidator(getUserSchema),
  bodyValidator(updateUserSchema),
  updateUser
);

userRouter.delete('/id/:id', paramsValidator(getUserSchema), deleteUser);

userRouter.get(
  '/role/:role',
  paramsValidator(getUserByRoleSchema),
  getUsersByRole
);
