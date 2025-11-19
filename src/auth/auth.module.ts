import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LocalStrategy } from './guards/local-strategy';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserService } from './services/user.service';
import { UserDoesNotExistConstraint } from './validation/user-does-not-exist.constraint';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/user.controller';
import { Profile } from './entities/profile.entity';
import { AuthService } from './services/auth.service';

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
