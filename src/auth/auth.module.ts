import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserDoesNotExistConstraint } from './validation/user-does-not-exist.constraint';
import { AuthController } from './auth.controller';
import { UsersController } from './user.controller';
import { Profile } from './profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    UserService,
    UserDoesNotExistConstraint,
  ],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
