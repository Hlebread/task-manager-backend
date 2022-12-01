import { Module } from '@nestjs/common';

import { AppConfigModule, SwaggerConfigModule } from '@/config';

@Module({
  imports: [AppConfigModule, SwaggerConfigModule],
})
export class AppModule {}
