import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../db/entities/User';
import UserService from '../services/UserService';
import { NewUser, UpdateUser } from '../types/user';
import { config } from '../config';
import boom from '@hapi/boom';

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
    await userService.sendEmailToVerify(user.token, user.email);
    res.json({
      info: 'Success',
      status: 201,
      message: 'You have successfully registered',
    });
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
): Promise<void> {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export function authUser(req: any, res: Response, next: NextFunction): void {
  try {
    const user: User = req.user;
    const sessionToken = jwt.sign(
      {
        user: user.id,
        isAdmin: user.isAdmin,
      },
      `${config.secret}`,
      {
        expiresIn: '7d',
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

export async function verifyUserEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.query;
    if (!token) {
      throw boom.badRequest('A token was expected');
    }
    await userService.findByToken(token);
    await userService.updateVerifyStatus(token);
    res.status(200).json({
      info: 'Success',
      status: 200,
      message: 'Your email has been successfully verified',
    });
  } catch (error) {
    next(error);
  }
}
