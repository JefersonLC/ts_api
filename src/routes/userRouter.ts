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
import { requestValidator } from '../middlewares/validator';
import passport from 'passport';
import { checkRole } from '../middlewares/auth';
import { request } from '../types/requestEnum';

export const userRouter: Router = Router();

userRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), checkRole, getUsers)
  .post(requestValidator(request.body, createUserSchema), createUser);

userRouter
  .route('/id/:id')
  .all(passport.authenticate('jwt', { session: false }))
  .get(checkRole, getUserById)
  .all(requestValidator(request.params, getUserSchema))
  .patch(requestValidator(request.body, updateUserSchema), updateUser)
  .delete(deleteUser);

userRouter.get(
  '/role/:role',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  requestValidator(request.params, getUserByRoleSchema),
  getUsersByRole
);
