import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import logger from './utils/logger';
import { PORT } from './constants';
import respond from './utils/respond';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (_: Request, res: Response): void {
  respond(res, {
    code: 404,
  });
});

app.use(function (err: any, _: Request, res: Response, next: any): void {
  logger.error('Middleware Error: ', err);
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
    message: err.message,
  });
  next();
});

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
