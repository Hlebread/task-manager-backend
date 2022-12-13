import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * A decorator that get cookies from request
 *
 * @decorator
 */
export const Cookies = createParamDecorator((data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return data ? request.cookies?.[data] : request.cookies;
});
