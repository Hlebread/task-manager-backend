import { join } from 'path';

import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with GraphQL config based operations.
 *
 * @class
 */
@Injectable()
export class GraphQLConfigService {
  /**
   * @ignore
   */
  constructor(private readonly configService: ConfigService) {}

  get debugEnabled(): boolean {
    return this.configService.get<string>('graphql.debugEnabled') === 'true';
  }

  get playgroundEnabled(): boolean {
    return this.configService.get<string>('graphql.playgroundEnabled') === 'true';
  }

  get config(): Omit<ApolloDriverConfig, 'driver'> {
    return {
      debug: this.debugEnabled,
      playground: this.playgroundEnabled,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req }) => ({ request: req }),
    };
  }
}
