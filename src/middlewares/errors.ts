import { Boom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function logError(
  err: any,
  _req: Request,
  _res: Response,
  _next: NextFunction
): void {
  console.log(err);
}

export function boomError(
  err: Boom<Joi.ValidationError>,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(err.output.statusCode).json({
    message: err.output.payload.message,
    error: err.output.payload.error,
    data: err.data,
  });
  next(err);
}
