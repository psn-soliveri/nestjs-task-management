import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // Get the request body
    const req = ctx.switchToHttp().getRequest();

    // Return user from the request
    return req.user;
  },
);
