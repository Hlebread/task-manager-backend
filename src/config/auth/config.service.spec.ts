// TODO: fix error with envs not taken from evironment

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthConfigService } from './config.service';
import { validationSchema } from './config.validation';
import { configuration } from './configuration';

describe('AuthConfigService', () => {
  const ENV = process.env;
  let service: AuthConfigService;

  const createTestingModule = async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationSchema,
        }),
      ],
      providers: [ConfigService, AuthConfigService],
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
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

  describe('JWT authentication', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should return JWT access token secret', () => {
      expect(service.jwtAtSecret).toBe('access_secret');
    });

    it('should return JWT access token expiration time', () => {
      expect(service.jwtAtExpTime).toBe('1d');
    });

    it('should return JWT refresh token secret', () => {
      expect(service.jwtRtSecret).toBe('refresh_secret');
    });

    it('should return JWT refresh token expiration time', () => {
      expect(service.jwtRtExpTime).toBe('14d');
    });
  });

  // ? Temporarily commented, because not implemented
  /* describe('JWT verification', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should return JWT verification token secret', () => {
      expect(typeof service.jwtVtSecret).toBe('string');
    });

    it('should return JWT verification token expiration time', () => {
      expect(typeof service.jwtVtExpTime).toBe('number');
    });
  });

  describe('Google authentication', () => {
    beforeEach(async () => {
      await createTestingModule();
    });

    it('should return Google auth id', () => {
      expect(typeof service.gAuthId).toBe('string');
    });

    it('should return Google auth secret', () => {
      expect(typeof service.gAuthSecret).toBe('string');
    });
  }); */
});
