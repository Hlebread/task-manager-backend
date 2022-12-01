import * as Joi from 'joi';

/**
 * Validation schema for specified TypeOrm `env` vars
 *
 * @schema
 */
export const validationSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_DATABASE: Joi.string().default('postgres'),
  POSTGRES_USERNAME: Joi.string().default('postgres'),
  POSTGRES_PASSWORD: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
});
