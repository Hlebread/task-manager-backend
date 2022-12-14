import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppConfigService, SwaggerConfigService } from '@/config';

import { AppModule } from './app.module';
import { StrictValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get<AppConfigService>(AppConfigService);
  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService);
  const logger = new Logger('Bootstrapper');

  app.useGlobalPipes(new StrictValidationPipe());
  app.use(cookieParser());
  swaggerConfig.setup(app);

  await app.listen(appConfig.port);

  logger.log(appConfig.startMessage);
}

bootstrap();
