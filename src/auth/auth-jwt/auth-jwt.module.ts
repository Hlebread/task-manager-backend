import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthConfigModule, AuthConfigService } from '@/config';
import { UsersModule } from '@/models/users';

import { AuthBasicModule } from '../auth-basic';

import { AuthJwtResolver } from './auth-jwt.resolver';
import { AuthJwtService } from './auth-jwt.service';

/**
 * Imports and provides basic JWT authentication related classes.
 *
 * @module
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtAtSecret,
        signOptions: {
          expiresIn: authConfigService.jwtAtExpTime,
        },
      }),
    }),
    AuthBasicModule,
    AuthConfigModule,
    UsersModule,
  ],
  providers: [AuthJwtResolver, AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
