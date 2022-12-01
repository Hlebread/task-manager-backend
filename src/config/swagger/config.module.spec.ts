import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { SwaggerConfigModule } from './config.module';
import { SwaggerConfigService } from './config.service';

describe('SwaggerConfigModule', () => {
  it('should compile the module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwaggerConfigModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigService)).toBeInstanceOf(ConfigService);
    expect(module.get(SwaggerConfigService)).toBeInstanceOf(SwaggerConfigService);
  });
});
