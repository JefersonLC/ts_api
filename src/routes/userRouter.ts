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

userRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), checkRole, getUsers)
  .post(bodyValidator(createUserSchema), createUser);

userRouter
  .route('/id/:id')
  .all(passport.authenticate('jwt', { session: false }))
  .get(checkRole, getUserById)
  .all(paramsValidator(getUserSchema))
  .patch(bodyValidator(updateUserSchema), updateUser)
  .delete(deleteUser);

userRouter.get(
  '/role/:role',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  paramsValidator(getUserByRoleSchema),
  getUsersByRole
);
