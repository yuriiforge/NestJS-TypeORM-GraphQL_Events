import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuardJwt } from './auth-guard.jwt';
import { ExecutionContext } from '@nestjs/common';

export class AuthGuardJwtGql extends AuthGuardJwt {
  getRequest(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ctx = GqlExecutionContext.create(context);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ctx.getContext().req;
  }
}
