import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppConfigService, SwaggerConfigService } from '@/config';

import { AppModule } from './app.module';
import { StrictValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get<AppConfigService>(AppConfigService);
  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService);
  const logger = new Logger('Bootstrapper');

  swaggerConfig.setup(app);

  app.useGlobalPipes(new StrictValidationPipe());

  await app.listen(appConfig.port);

  logger.log(appConfig.startMessage);
}

bootstrap();
