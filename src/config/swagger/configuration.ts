import { registerAs } from '@nestjs/config';

/**
 * Registered configuration object behind a `swagger` token.
 */
export const configuration = registerAs('swagger', () => ({
  url: process.env.SWAGGER_URL,
  title: process.env.SWAGGER_TITLE,
  description: process.env.SWAGGER_DESCRIPTION,
  version: process.env.SWAGGER_VERSION,
  user: process.env.SWAGGER_USER,
  password: process.env.SWAGGER_PASSWORD,
}));
