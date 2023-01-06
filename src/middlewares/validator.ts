import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import boom from '@hapi/boom';
import { NewUser } from '../types/user';

export function bodyValidator(
  schema: Joi.ObjectSchema<any>
): (req: Request, _res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction) => {
    const body: NewUser = req.body;
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      next(boom.badData('Bad Data', error));
    }
    next();
  };
}

export function paramsValidator(schema: Joi.ObjectSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const params = req.params;
    console.log(params);
    const { error } = schema.validate(params, { abortEarly: false });
    if (error) {
      next(boom.badData('Bad Data', error));
    }
    next();
  };
}
