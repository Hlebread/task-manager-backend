import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '@/config';

import { User } from './user.entity';
import { UsersAdminResolver } from './users-admin.resolver';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AppConfigModule],
  providers: [UsersAdminResolver, UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
