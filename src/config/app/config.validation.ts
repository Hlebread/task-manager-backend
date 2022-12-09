import * as Joi from 'joi';

import { Environments } from '@/common';

/**
 * Validation schema for specified App `env` vars
 *
 * @schema
 */
export const validationSchema = Joi.object({
  APP_NAME: Joi.string().default('Portfolio server'),
  APP_URL: Joi.string().default('http://localhost:5001'),
  APP_START_MESSAGE: Joi.string(),
  PORT: Joi.number().default(5001),
  NODE_ENV: Joi.string()
    .valid(
      Environments.DEVELOPMENT,
      Environments.PRODUCTION,
      Environments.STAGING,
      Environments.TEST,
    )
    .default(Environments.DEVELOPMENT),
});
