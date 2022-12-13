import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthConfigModule } from '@/config';
import { UsersModule } from '@/models/users';

import { AuthBasicModule } from './auth-basic';
import { AuthCookiesModule } from './auth-cookies';
import { AuthJwtModule } from './auth-jwt';
import { AuthResolver } from './auth.resolver';
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from './strategies';

/**
 * Imports and aggregates authentication related classes.
 *
 * @module
 */
@Module({
  imports: [
    AuthBasicModule,
    AuthConfigModule,
    AuthJwtModule,
    AuthCookiesModule,
    PassportModule,
    UsersModule,
  ],
  providers: [AuthResolver, JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
