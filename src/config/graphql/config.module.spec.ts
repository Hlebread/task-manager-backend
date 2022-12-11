import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { GraphQLConfigModule } from './config.module';
import { GraphQLConfigService } from './config.service';

describe('GraphQLConfigModule', () => {
  it('should compile the module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GraphQLConfigModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigService)).toBeInstanceOf(ConfigService);
    expect(module.get(GraphQLConfigService)).toBeInstanceOf(GraphQLConfigService);
  });
});
