import { Boom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { QueryFailedError } from 'typeorm';

export function logError(
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  console.log(err);
  next(err);
}

export function boomError(
  err: Boom<Joi.ValidationError>,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof Boom<Joi.ValidationError>) {
    res.status(err.output.statusCode).json({
      message: err.output.payload.message,
      error: err.output.payload.error,
      data: err.data,
    });
  }
  next(err);
}

export function ormError(
  err: QueryFailedError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof QueryFailedError) {
    res.status(400).json({
      error: err.name,
      message: 'Query failed',
      status: 400,
    });
  }
  next(err);
}
