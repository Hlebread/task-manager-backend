import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

/**
 * Import and provide TypeOrm configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [ConfigService, TypeOrmConfigService],
  exports: [ConfigService, TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
