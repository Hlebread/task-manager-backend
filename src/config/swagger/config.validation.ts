import * as Joi from 'joi';

/**
 * Validation schema for specified Swagger `env` vars
 *
 * @schema
 */
export const validationSchema = Joi.object({
  SWAGGER_URL: Joi.string().default('/api'),
  SWAGGER_TITLE: Joi.string().default('Api Docs'),
  SWAGGER_DESCRIPTION: Joi.string().default('Task Manager API documentation'),
  SWAGGER_VERSION: Joi.string().default('0.0.1'),
  SWAGGER_USER: Joi.string().default('developer'),
  SWAGGER_PASSWORD: Joi.string().default('123'),
});
