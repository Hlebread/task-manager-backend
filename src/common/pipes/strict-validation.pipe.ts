import { ValidationPipe } from '@nestjs/common';

/**
 * A pipe that validate query string for compliance
 *
 * @pipe
 */
export class StrictValidationPipe extends ValidationPipe {
  /**
   * @ignore
   */
  constructor() {
    /**
     * We provide pipe config to the ValidationPipe constructors
     */
    super({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });
  }
}
