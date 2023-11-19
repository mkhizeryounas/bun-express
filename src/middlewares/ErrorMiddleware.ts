import type { Request, Response } from 'express';
import logger from '../utils/logger';
import respond from '../utils/respond';

export default function (err: any, _: Request, res: Response, next: any): void {
  logger.error('Error Middleware: ', err.status, '::', err.message);
  res.locals.message = err.message;
  if (err.isJoi || err.hasOwnProperty('errors') || err.name === 'MongoError') {
    err.status = 422;
  }
  if (err.hasOwnProperty('errors') && Array.isArray(err.errors)) {
    err.errors = err.errors.reduce((pre: any, now: any) => {
      return [...pre, ...now.messages];
    }, []);
  }
  respond(res, {
    code: err.status ?? 400,
    data: err.hasOwnProperty('errors')
      ? err.errors
      : err.name === 'MongoError'
      ? err
      : err.data,
    message: err.message
  });
  next();
}
