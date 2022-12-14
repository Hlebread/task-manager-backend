import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  AppConfigModule,
  GraphQLConfigModule,
  GraphQLConfigService,
  SwaggerConfigModule,
  TypeOrmConfigModule,
  TypeOrmConfigService,
} from '@/config';

import { AuthModule } from './auth';
import { ListsModule } from './models/lists';
import { UsersModule } from './models/users';

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
    AuthModule,
    AppConfigModule,
    SwaggerConfigModule,
    UsersModule,
    ListsModule,
  ],
})
export class AppModule {}
