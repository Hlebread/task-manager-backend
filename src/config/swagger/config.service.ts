import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

import { Environments } from '@/common';

import { AppConfigService } from '../app';

/**
 * Service dealing with Swagger config based operations.
 *
 * @class
 */
@Injectable()
export class SwaggerConfigService {
  /**
   * Logger for `SwaggerConfigService`
   *
   * @external
   */
  private readonly logger: Logger = new Logger('Swagger');

  /**
   * Swagger environments
   *
   * @property
   */
  private readonly envs: string[] = [
    Environments.DEVELOPMENT,
    Environments.PRODUCTION,
    Environments.STAGING,
    Environments.TEST,
  ];

  /**
   * Swagger endpoints
   *
   * @property
   */
  private readonly endpoints: string[] = [this.url, `${this.url}-json`];

  /**
   * @ignore
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Swagger endpoint
   *
   * @property
   */
  get url(): string {
    return this.configService.get<string>('swagger.url');
  }

  /**
   * Swagger title
   *
   * @property
   */
  get title(): string {
    return this.configService.get<string>('swagger.title');
  }

  /**
   * Swagger description
   *
   * @property
   */
  get description(): string {
    return this.configService.get<string>('swagger.description');
  }

  /**
   * Swagger version
   *
   * @property
   */
  get version(): string {
    return this.configService.get<string>('swagger.version');
  }

  /**
   * Swagger user
   *
   * @property
   */
  private get user(): string {
    return this.configService.get<string>('swagger.user');
  }

  /**
   * Swagger password
   *
   * @property
   */
  private get password(): string {
    return this.configService.get<string>('swagger.password');
  }

  /**
   * Set up Swagger
   *
   * @param {INestApplication} app Instance of application
   */
  setup(app: INestApplication): void {
    const appEnv = this.appConfigService.environment;

    if (this.envs.includes(appEnv)) {
      if (!(appEnv === Environments.DEVELOPMENT || appEnv === Environments.TEST)) {
        this.protectSwaggerEndpoints(app);
      } else {
        this.logger.warn('Swagger is not protected');
      }

      const swaggerConfig = new DocumentBuilder()
        .setTitle(this.title)
        .setDescription(this.description)
        .setVersion(this.version)
        .build();

      const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

      SwaggerModule.setup(this.url, app, swaggerDocument, {
        swaggerOptions: {
          tagsSorter: 'alpha',
        },
      });

      this.logger.log(`Swagger started on \x1b[36m${this.url}\x1b[32m`);
    }

    this.logger.warn(`Swagger is not available for use in ${appEnv} mode`);
  }

  /**
   * Set up authentication on `this.endpoints` routes
   *
   * @param {INestApplication} app Instance of application
   */
  private protectSwaggerEndpoints(app: INestApplication) {
    app.use(
      this.endpoints,
      basicAuth({
        challenge: true,
        users: {
          [this.user]: this.password,
        },
      }),
    );
  }
}
