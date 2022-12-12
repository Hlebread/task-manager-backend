import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@/models/users';

import { AuthBasicModule } from '../auth-basic';

import { AuthJwtResolver } from './auth-jwt.resolver';
import { AuthJwtService } from './auth-jwt.service';

/**
 * Import and provide basic JWT authentication related classes.
 *
 * @module
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
    AuthBasicModule,
    UsersModule,
  ],
  providers: [AuthJwtResolver, AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
