import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Payload } from '@src/apis/auth/constants/payload.interface';

export const User = createParamDecorator(
  (data: keyof Payload, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user[data] || req.user;
  },
);
