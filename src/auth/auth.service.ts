import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getTokenForUser(user: User): string {
    const payload: JwtPayload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload) as string;
    return token;
  }

  public async hashPassword(password: string): Promise<string> {
    return (await bcrypt.hash(password, 10)) as string;
  }

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      this.logger.debug(`User ${username} not found!`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
