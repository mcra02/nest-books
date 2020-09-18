import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return data ? req.user && req.user[data] : req.user;
  }
);

export const CurrentUserGQL = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return data
      ? ctx.getContext().req.user && ctx.getContext().req.user[data]
      : ctx.getContext().req.user;
  }
);
