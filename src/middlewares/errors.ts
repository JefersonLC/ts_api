import { Boom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { MulterError } from 'multer';
import { QueryFailedError } from 'typeorm';
import fs from 'fs';

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
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const file = req.file;
  if (file && fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }
  if (err.isBoom) {
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

export function syntaxError(
  err: SyntaxError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof SyntaxError) {
    res.status(400).json({
      error: err.name,
      message: 'Unexpected format',
      status: 400,
    });
  }
  next(err);
}

export function multerError(
  err: MulterError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof MulterError) {
    res.status(400).json({
      error: err.name,
      message: err.message,
      field: err.field,
    });
  }
  next(err);
}
