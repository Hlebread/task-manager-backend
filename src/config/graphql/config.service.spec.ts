import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { GraphQLConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

describe('GraphQLConfigService', () => {
  const ENV = process.env;
  let service: GraphQLConfigService;

  const createTestingModule = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
          load: [configuration],
          validationSchema,
        }),
      ],
      providers: [ConfigService, GraphQLConfigService],
    }).compile();

    service = module.get<GraphQLConfigService>(GraphQLConfigService);
  };

  beforeEach(async () => {
    jest.resetModules();
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

  describe('when GraphQL environment variables are not set', () => {
    beforeEach(async () => {
      process.env = {};
      await createTestingModule();
    });

    it('should return default debugEnabled', () => {
      expect(service.debugEnabled).toBe(false);
    });

    it('should return default playgroundEnabled', () => {
      expect(service.playgroundEnabled).toBe(false);
    });
  });

  describe('when app environment variables are set', () => {
    beforeEach(async () => {
      process.env = ENV;
      await createTestingModule();
    });

    it('should return custom port', () => {
      expect(service.debugEnabled).toBe(true);
    });

    it('should return custom environment mode', () => {
      expect(service.playgroundEnabled).toBe(true);
    });
  });
});
