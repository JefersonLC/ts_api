import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/entities/User';
import UserService from '../services/UserService';
import { NewUser, UpdateUser } from '../types/user';
import { config } from '../config';

const userService = new UserService();

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users: User[] = await userService.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const user: User = await userService.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUsersByRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { role } = req.params;
    let isAdmin: boolean;
    if (role === 'admin') isAdmin = true;
    else isAdmin = false;
    const users: User[] = await userService.findByRole(isAdmin);
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
    const user = await userService.createUser(data);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const data: UpdateUser = req.body;
    const user = await userService.updateUser(data, id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export function authUser(req: any, res: Response, next: NextFunction) {
  try {
    const user: User = req.user;
    const sessionToken = jwt.sign(
      {
        user: user.id,
        isAdmin: user.isAdmin,
      },
      `${config.secret}`,
      {
        expiresIn: "7d",
      }
    );
    res.json({
      user,
      sessionToken,
    });
  } catch (error) {
    next(error);
  }
}
