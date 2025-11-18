import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
    }),
    DatabaseModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
