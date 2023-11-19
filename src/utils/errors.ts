import createHttpError from 'http-errors';

type CommonMessages = {
  [key: number]: string;
};

export const COMMON_MESSAGES: CommonMessages = {
  200: 'Request processed successfully.',
  201: 'New entry has been created.',
  400: 'The request by the client was not processed, as the server could not understand what the client is asking for.',
  401: 'The client is not allowed to access resources, and should re-request with the required credentials.',
  403: 'The client is not allowed access the resource.',
  404: 'The requested resource is not available.',
  500: 'Request can not be processed due to unexpected internal server error.',
  503: 'Server is down or unavailable to receive and process the request',
};

const BaseError = (code: number, message?: string) => {
  return createHttpError(code, message ?? COMMON_MESSAGES[code]);
};

export const NotFoundError = (message?: string) => {
  return BaseError(404, message);
};

export const BadRequestError = (message?: string) => {
  return BaseError(400, message);
};

export const UnauthorizedError = (message?: string) => {
  return BaseError(401, message);
};

export const ForbiddenError = (message?: string) => {
  return BaseError(403, message);
};

export const InternalServerError = (message?: string) => {
  return BaseError(500, message);
};

export const ServiceUnavailableError = (message?: string) => {
  return BaseError(503, message);
};
