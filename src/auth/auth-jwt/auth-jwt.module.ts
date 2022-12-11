import { Module } from '@nestjs/common';

import { UsersModule } from '@/models/users';

import { AuthJwtService } from './auth-jwt.service';

/**
 * Import and provide basic authentication related classes.
 *
 * @module
 */
@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthJwtModule {}
