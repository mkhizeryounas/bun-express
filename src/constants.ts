export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const PORT = process.env.PORT ?? 3000;
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'silly';
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ?? 'mongodb://localhost:27017/nocode-backend';
export const SECRET = process.env.SECRET ?? 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB';
export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
export const AWS = {
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  BUCKET: process.env.AWS_BUCKET ?? '',
  ENDPOINT: process.env.AWS_ENDPOINT ?? '',
  CDN_ENDPOINT: process.env.AWS_CDN_ENDPOINT ?? 'https://cdn.workify.xyz',
};