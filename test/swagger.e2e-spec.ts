import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { SwaggerConfigModule, SwaggerConfigService } from '@/config';

describe('Swagger (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SwaggerConfigModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const swaggerConfigService = app.get(SwaggerConfigService);

    swaggerConfigService.setup(app);

    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer()).get('/api').expect(200);
  });

  it('/api-json (GET)', () => {
    return request(app.getHttpServer()).get('/api-json').expect(200);
  });
});
