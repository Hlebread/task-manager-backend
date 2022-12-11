import { Module } from '@nestjs/common';

import { UsersModule } from '@/models/users';

import { LocalStrategy } from '../strategies';

import { AuthBasicService } from './auth-basic.service';
import { AuthResolver } from './auth.resolver';

/**
 * Import and provide basic authentication related classes.
 *
 * @module
 */
@Module({
  imports: [UsersModule],
  providers: [AuthResolver, AuthBasicService, LocalStrategy],
  exports: [AuthBasicService],
})
export class AuthBasicModule {}
