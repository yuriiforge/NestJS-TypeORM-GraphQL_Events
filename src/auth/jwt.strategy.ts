import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Request } from 'express';

export interface JwtPayload {
  sub: number;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (
        req: Request,
      ) => string | null,
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {
    return await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
    });
  }
}
