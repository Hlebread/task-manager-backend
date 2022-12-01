import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

describe('AppConfigService', () => {
  const ENV = process.env;
  let service: AppConfigService;

  const createTestingModule = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema,
        }),
      ],
      providers: [ConfigService, AppConfigService],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  };

  beforeEach(() => {
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

  describe('when app environment variables are not set', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should return default app name', () => {
      expect(service.name).toBe('Portfolio server');
    });

    it('should return default app url', () => {
      expect(service.url).toBe('http://localhost:5001');
    });

    it('should return default port', () => {
      expect(service.port).toBe(5001);
    });

    it('should return test environment mode', () => {
      expect(service.environment).toBe('test');
    });

    it('should return default server start message', () => {
      expect(service.startMessage).toBe(
        '\x1b[36mPortfolio server\x1b[32m server has been started with \x1b[36mtest\x1b[32m config on port = \x1b[36m5001\x1b[0m',
      );
    });
  });

  describe('when app environment variables are set', () => {
    beforeEach(async () => {
      process.env = {
        APP_NAME: 'Test proxy',
        APP_URL: 'http://localhost:10000',
        APP_START_MESSAGE: 'Test message',
        PORT: '10000',
        NODE_ENV: 'development',
      };

      await createTestingModule();
    });

    it('should return custom port', () => {
      expect(service.port).toBe(10000);
    });

    it('should return custom environment mode', () => {
      expect(service.environment).toBe('development');
    });

    it('should return custom server start message', () => {
      expect(service.startMessage).toBe('Test message');
    });
  });

  describe('when the set environment variables are not valid', () => {
    it('should throw error if PORT variable is not a number', async () => {
      process.env = {
        PORT: 'port',
      };

      await expect(createTestingModule()).rejects.toThrowError(
        'Config validation error: "PORT" must be a number',
      );
    });

    it('should throw error if NODE_ENV variable is not allowed', async () => {
      process.env = {
        NODE_ENV: 'dev',
      };

      await expect(createTestingModule()).rejects.toThrowError(
        'Config validation error: "NODE_ENV" must be one of [development, production, staging, test]',
      );
    });
  });
});
