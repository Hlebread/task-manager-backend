import { join } from 'path';

import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  AppConfigModule,
  AppConfigService,
  GraphQLConfigModule,
  GraphQLConfigService,
  SwaggerConfigModule,
  TypeOrmConfigModule,
  TypeOrmConfigService,
} from '@/config';

import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeOrmConfigService],
      useFactory: (config: TypeOrmConfigService): TypeOrmModuleOptions => ({
        ...config.getConfig(),
        entities: [],
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [GraphQLConfigModule],
      inject: [GraphQLConfigService],
      useFactory: (config: GraphQLConfigService) => config.config,
      driver: ApolloDriver,
    }),
    AppConfigModule,
    SwaggerConfigModule,
    UsersModule,
  ],
})
export class AppModule {}
