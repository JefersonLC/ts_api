import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import boom from '@hapi/boom';
import { request } from '../types/requestEnum';

export function requestValidator(
  property: request,
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any[]>
): (req: Request, _res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction) => {
    const body = req[property];
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      next(boom.badData('Bad Data', error));
    }
    next();
  };
}
