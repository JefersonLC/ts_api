import { Request, Response, NextFunction } from 'express';
import { User } from '../db/entities/User';
import UserService from '../services/UserService';
import { NewUser } from '../types/user';

const user = new UserService();

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log(_req.query)
    const users: User[] = await user.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUsersById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const users: User[] = await user.findById(id);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: NewUser = req.body;
    const newUser = await user.create(data);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
}

// export async function getAdminUsers(
//   _req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const users: User[] = await user.findByRole(true);
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// }

// export async function getCommonUsers(
//   _req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const users: User[] = await user.findByRole(false);
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// }
