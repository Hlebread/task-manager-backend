import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigModule } from '../app';

import { SwaggerConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

/**
 * Import and provide Swagger configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configuration],
      validationSchema,
    }),
    AppConfigModule,
  ],
  providers: [ConfigService, SwaggerConfigService],
  exports: [ConfigService, SwaggerConfigService],
})
export class SwaggerConfigModule {}
