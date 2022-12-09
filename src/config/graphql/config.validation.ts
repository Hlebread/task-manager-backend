import * as Joi from 'joi';

/**
 * Validation schema for specified GraphQL `env` vars.
 *
 * @schema
 */
export const validationSchema = Joi.object({
  GRAPHQL_DEBUG_MODE_ENABLED: Joi.boolean().default(false),
  GRAPHQL_PLAYGROUND_ENABLED: Joi.boolean().default(false),
});
