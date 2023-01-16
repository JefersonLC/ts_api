import boom from '@hapi/boom';
import { Response, NextFunction } from 'express';
import { User } from '../db/entities/User';

export function checkRole(req: any, _res: Response, next: NextFunction) {
  const user: User = req.user;
  if (!user.isAdmin) {
    next(boom.unauthorized("You don't have the required permissions"));
  }
  next();
}
