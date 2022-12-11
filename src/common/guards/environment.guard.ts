import { CanActivate, Inject, Type, mixin } from '@nestjs/common';

import { AppConfigService } from '@/config';

import { Environments } from '../enums';

export const EnvironmentGuard = (
  environments?: Environments | Environments[],
): Type<CanActivate> => {
  class PermissionGuardMixin {
    constructor(@Inject(AppConfigService) private readonly appConfigService: AppConfigService) {}

    async canActivate() {
      if (!environments) {
        return true;
      }

      const envs = Array.isArray(environments) ? environments : [environments];

      return envs.includes(this.appConfigService.environment);
    }
  }

  return mixin(PermissionGuardMixin);
};
