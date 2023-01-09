import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import boom from '@hapi/boom';

export function bodyValidator(
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any[]>
): (req: Request, _res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      next(boom.badData('Bad Data', error));
    }
    next();
  };
}

export function paramsValidator(
  schema: Joi.ObjectSchema<any>
): (req: Request, _res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction) => {
    const params = req.params;
    const { error } = schema.validate(params, { abortEarly: false });
    if (error) {
      next(boom.badData('Bad Data', error));
    }
    next();
  };
}
