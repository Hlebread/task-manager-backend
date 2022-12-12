import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@/models/users';

import { AuthBasicModule } from './auth-basic';
import { AuthJwtModule } from './auth-jwt';
import { JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy } from './strategies';

/**
 * Import and provide basic authentication related classes.
 *
 * @module
 */
@Module({
  imports: [AuthBasicModule, AuthJwtModule, PassportModule, UsersModule],
  providers: [JwtRefreshTokenStrategy, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
