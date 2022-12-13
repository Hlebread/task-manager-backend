import * as Joi from 'joi';

/**
 * Validation schema for specified Swagger `env` vars
 *
 * @schema
 */
export const validationSchema = Joi.object({
  JWT_ACCESS_TOKEN_SECRET: Joi.string().default('access_secret'),
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default('1d'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().default('refresh_secret'),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default('14d'),

  // ? Temporarily commented, because not implemented
  // JWT_VERIFICATION_TOKEN_SECRET: Joi.string().default('7AnEd5epXmdaJfUrokkQ'),
  // JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.number().default(21600),
  // GOOGLE_AUTH_CLIENT_ID: Joi.string().default(''),
  // GOOGLE_AUTH_CLIENT_SECRET: Joi.string().default('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'),
});
