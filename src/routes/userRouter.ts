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
import passport from 'passport';
import { checkRole } from '../middlewares/auth';

export const userRouter: Router = Router();

userRouter.get('/', passport.authenticate('jwt', { session: false }), getUsers);

userRouter.post('/', bodyValidator(createUserSchema), createUser);

userRouter.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getUserSchema),
  getUserById
);

userRouter.patch(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getUserSchema),
  bodyValidator(updateUserSchema),
  updateUser
);

userRouter.delete(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  paramsValidator(getUserSchema),
  deleteUser
);

userRouter.get(
  '/role/:role',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getUserByRoleSchema),
  getUsersByRole
);
