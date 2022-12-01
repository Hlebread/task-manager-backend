import { registerAs } from '@nestjs/config';

/**
 * Registered configuration object behind a `typeorm` token.
 */
export const configuration = registerAs('typeorm', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
}));
