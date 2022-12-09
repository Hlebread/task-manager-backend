import { registerAs } from '@nestjs/config';

/**
 * Registered configuration object behind an `graphql` token.
 */
export const configuration = registerAs('graphql', () => ({
  debugEnabled: process.env.GRAPHQL_DEBUG_MODE_ENABLED,
  playgroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED,
}));
