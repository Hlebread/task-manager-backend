import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Service dealing with TypeOrm config based operations.
 *
 * @class
 */
@Injectable()
export class TypeOrmConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Database host.
   *
   * @property
   */
  get host(): string {
    return this.configService.get<string>('typeorm.host');
  }

  /**
   * Database port.
   *
   * @property
   */
  get port(): number {
    return Number(this.configService.get<number>('typeorm.port'));
  }

  /**
   * Database username.
   *
   * @property
   */
  get username(): string {
    return this.configService.get<string>('typeorm.username');
  }

  /**
   * Database password.
   *
   * @property
   */
  get password(): string {
    return this.configService.get<string>('typeorm.password');
  }

  /**
   * Database type.
   *
   * @property
   */
  get database(): string {
    return this.configService.get<string>('typeorm.database');
  }

  /**
   * Synchronize in TypeORM.
   *
   * @property
   */
  get synchronize(): boolean {
    return this.configService.get<string>('typeorm.synchronize') === 'true';
  }

  /**
   * Get TypeOrm module config.
   *
   * @return TypeORM config.
   */
  getConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: this.synchronize,
      host: this.host,
      port: this.port,
      database: this.database,
      username: this.username,
      password: this.password,
    };
  }
}
