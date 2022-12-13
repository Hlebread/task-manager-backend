import { registerAs } from '@nestjs/config';

/**
 * Registered configuration object behind an `auth` token.
 */
export const configuration = registerAs('auth', () => ({
  jwtAtSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtAtExpTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  jwtRtSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRtExpTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,

  // ? Temporarily commented, because not implemented
  // jwtVtSecret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
  // jwtVtExpTime: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
  // gAuthId: process.env.GOOGLE_AUTH_CLIENT_ID,
  // gAuthSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
}));
