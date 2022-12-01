import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  AppConfigModule,
  SwaggerConfigModule,
  TypeOrmConfigModule,
  TypeOrmConfigService,
} from '@/config';

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
    AppConfigModule,
    SwaggerConfigModule,
  ],
})
export class AppModule {}
