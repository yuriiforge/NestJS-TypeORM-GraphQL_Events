import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuardLocal } from '../guards/auth-guard.local';
import { User } from '../entities/user.entity';
import { CurrentUser } from '../current-user.decorator';
import { AuthGuardJwt } from '../guards/auth-guard.jwt';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuardLocal)
  login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
