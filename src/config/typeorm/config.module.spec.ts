import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmConfigModule } from './config.module';
import { TypeOrmConfigService } from './config.service';

describe('TypeOrmConfigModule', () => {
  it('should compile the module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmConfigModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigService)).toBeInstanceOf(ConfigService);
    expect(module.get(TypeOrmConfigService)).toBeInstanceOf(TypeOrmConfigService);
  });
});
