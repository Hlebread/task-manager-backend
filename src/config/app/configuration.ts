import { registerAs } from '@nestjs/config';

/**
 * Registered configuration object behind an `app` token.
 */
export const configuration = registerAs('app', () => ({
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  message: process.env.APP_START_MESSAGE,
}));
