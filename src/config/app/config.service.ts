import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environments } from '@/common';

/**
 * Service dealing with App config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  /**
   * @ignore
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * App name.
   *
   * @property
   */
  get name(): string {
    return this.configService.get<string>('app.name');
  }

  /**
   * URL on which the application is launched.
   *
   * @property
   */
  get url(): string {
    return this.configService.get<string>('app.url');
  }

  /**
   * Port on which the application is launched.
   *
   * @property
   */
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  /**
   * Application environment mode.
   *
   * @property
   */
  get environment(): Environments {
    return this.configService.get<Environments>('app.environment');
  }

  /**
   * Server start message.
   *
   * @property
   */
  get startMessage(): string {
    return this.configService.get<string>('app.message') ?? this.defaultMessage;
  }

  /**
   * Default server start message.
   *
   * @property
   */
  private get defaultMessage(): string {
    return `\x1b[36m${this.name}\x1b[32m server has been started with \x1b[36m${this.environment}\x1b[32m config on port = \x1b[36m${this.port}\x1b[0m`;
  }
}
