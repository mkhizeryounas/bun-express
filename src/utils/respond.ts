import type { Response } from 'express';
import { COMMON_MESSAGES } from './errors';

type Args = {
  code?: number;
  data?: any;
  message?: string;
};

export const respond = (res: Response, args: Args) => {
  let { code, data, message } = args;
  code = code ?? 200;
  message = message ?? COMMON_MESSAGES[code];
  data =
    code >= 400
      ? {
          message,
          errors: data,
        }
      : data;
  res.status(code).json(data);
};

export default respond;
