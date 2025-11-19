import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './entities/user.entity';

export const CurrentUser = createParamDecorator<User | null>(
  (data: unknown, ctx: ExecutionContext): User | null => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const gqlContext = GqlExecutionContext.create(ctx);

    if (gqlContext) {
      return gqlContext.getContext().req.user;
    }

    const request = ctx.switchToHttp().getRequest<{ user?: User }>();
    return request.user ?? null;
  },
);
