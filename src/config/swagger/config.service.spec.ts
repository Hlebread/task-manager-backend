import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { AppConfigModule } from '../app';

import { SwaggerConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

describe('SwaggerConfigService', () => {
  const ENV = process.env;
  let service: SwaggerConfigService;

  const createTestingModule = async (): Promise<void> => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema,
        }),
        AppConfigModule,
      ],
      providers: [ConfigService, SwaggerConfigService],
    }).compile();

    service = module.get<SwaggerConfigService>(SwaggerConfigService);
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

  describe('when swagger environment variables are not set', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should return default url', () => {
      expect(service.url).toBe('/api');
    });

    it('should return default title', () => {
      expect(service.title).toBe('Api Docs');
    });

    it('should return default description', () => {
      expect(service.description).toBe('REST API documentation');
    });

    it('should return default version', () => {
      expect(service.version).toBe('0.0.1');
    });
  });

  describe('when swagger environment variables are set', () => {
    beforeEach(async () => {
      process.env = {
        SWAGGER_URL: 'Test url',
        SWAGGER_TITLE: 'Test title',
        SWAGGER_DESCRIPTION: 'Test description',
        SWAGGER_VERSION: '10000.0.0',
      };

      await createTestingModule();
    });

    it('should return custom url', () => {
      expect(service.url).toBe('Test url');
    });

    it('should return custom title', () => {
      expect(service.title).toBe('Test title');
    });

    it('should return custom description', () => {
      expect(service.description).toBe('Test description');
    });

    it('should return custom version', () => {
      expect(service.version).toBe('10000.0.0');
    });
  });

  describe('when swagger initialization started', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should call setup function only once', () => {
      service.setup = () => {
        return;
      };
      const spy = jest.spyOn(service, 'setup');

      service.setup(null);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
