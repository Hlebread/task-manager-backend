import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { TypeOrmConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

describe('TypeOrmConfigService', () => {
  const ENV = process.env;
  let service: TypeOrmConfigService;

  const createTestingModule = async (): Promise<void> => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
          load: [configuration],
          validationSchema,
        }),
      ],
      providers: [ConfigService, TypeOrmConfigService],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  };

  beforeEach(async () => {
    jest.resetModules();

    process.env = { ...ENV };
  });

  afterAll(() => {
    process.env = ENV;
  });

  describe('when module initialized', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when TypeOrm environment variables are not set', () => {
    it('should throw error if POSTGRES_HOST is not set', () => {
      process.env = {
        ...ENV,
        POSTGRES_HOST: undefined,
      };

      expect(() => createTestingModule()).rejects.toThrowError(
        'Config validation error: "POSTGRES_HOST" is required',
      );
    });

    it('should return default port', async () => {
      await createTestingModule();

      expect(service.port).toBe(5432);
    });

    it('should return default database type', async () => {
      await createTestingModule();

      expect(service.database).toBe('postgres');
    });

    it('should return default username', async () => {
      await createTestingModule();

      expect(service.username).toBe('postgres');
    });

    it('should throw error if POSTGRES_PASSWORD is not set', () => {
      process.env = {
        ...ENV,
        POSTGRES_PASSWORD: undefined,
      };

      expect(() => createTestingModule()).rejects.toThrowError(
        'Config validation error: "POSTGRES_PASSWORD" is required',
      );
    });

    it('should return default synchronize', async () => {
      await createTestingModule();

      expect(service.synchronize).toBe(false);
    });
  });

  describe('when TypeOrm environment variables are set', () => {
    beforeEach(async () => {
      process.env = {
        ...ENV,
        POSTGRES_HOST: 'host-custom',
        POSTGRES_PORT: '10000',
        POSTGRES_DATABASE: 'db',
        POSTGRES_USERNAME: 'username',
        TYPEORM_SYNCHRONIZE: 'true',
      };

      await createTestingModule();
    });

    it('should return host', () => {
      expect(service.host).toBe('host-custom');
    });

    it('should return port', () => {
      expect(service.port).toBe(10000);
    });

    it('should return database type', () => {
      expect(service.database).toBe('db');
    });

    it('should return username', () => {
      expect(service.username).toBe('username');
    });

    it('should return password', () => {
      expect(service.password).toBe('password');
    });

    it('should return synchronize', () => {
      expect(service.synchronize).toBe(true);
    });

    it('should return config', () => {
      expect(service.getConfig()).toEqual({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: 'host-custom',
        port: 10000,
        database: 'db',
        username: 'username',
        password: 'password',
      });
    });
  });
});
