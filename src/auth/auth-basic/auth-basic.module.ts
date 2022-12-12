import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/config';
import { UsersModule } from '@/models/users';

import { AuthBasicResolver } from './auth-basic.resolver';
import { AuthBasicService } from './auth-basic.service';

/**
 * Import and provide basic authentication related classes.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule, UsersModule],
  providers: [AuthBasicResolver, AuthBasicService],
  exports: [AuthBasicService],
})
export class AuthBasicModule {}
