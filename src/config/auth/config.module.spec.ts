import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthConfigModule } from './config.module';
import { AuthConfigService } from './config.service';

describe('AuthConfigModule', () => {
  it('should compile the module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthConfigModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigService)).toBeInstanceOf(ConfigService);
    expect(module.get(AuthConfigService)).toBeInstanceOf(AuthConfigService);
  });
});
