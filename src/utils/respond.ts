import type { Response } from 'express';
import logger from './logger';

const COMMON_MESSAGES: any = {
  200: 'Request processed successfully.',
  201: 'New entry has been created.',
  400: 'The request by the client was not processed, as the server could not understand what the client is asking for.',
  401: 'The client is not allowed to access resources, and should re-request with the required credentials.',
  403: 'The client is not allowed access the resource.',
  404: 'The requested resource is not available.',
  500: 'Request can not be processed due to unexpected internal server error.',
  503: 'Server is down or unavailable to receive and process the request',
};

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
