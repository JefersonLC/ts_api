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

// export function paramsValidator(body: NewUser, schema: Joi.ObjectSchema<any>) {
//   return (_req: Request, _res: Response, next: NextFunction) => {
//     const { error } = schema.validate(body, { abortEarly: false });
//     if (error) {
//       next(boom.badData('${error}'));
//     }
//     next();
//   };
// }
