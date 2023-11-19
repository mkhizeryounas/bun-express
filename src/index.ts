import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import { PORT } from './constants';
import routes from './routes';
import ErrorMiddleware from './middlewares/ErrorMiddleware';
import logger from './utils/logger';
import { NotFoundError } from './utils/errors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

app.use(function (_: Request, res: Response, next): void {
  next(NotFoundError());
});

app.use(ErrorMiddleware);

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
