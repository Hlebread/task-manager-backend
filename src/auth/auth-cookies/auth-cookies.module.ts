import { Module } from '@nestjs/common';

import { AuthBasicModule } from '../auth-basic';
import { AuthJwtModule } from '../auth-jwt';

import { AuthCookiesResolver } from './auth-cookies.resolver';
import { AuthCookiesService } from './auth-cookies.service';

/**
 * Imports and provides authentication with cookies related classes.
 *
 * @module
 */
@Module({
  imports: [AuthBasicModule, AuthJwtModule],
  providers: [AuthCookiesResolver, AuthCookiesService],
  exports: [AuthCookiesService],
})
export class AuthCookiesModule {}
