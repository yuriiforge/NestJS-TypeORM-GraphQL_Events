import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './config/env.validation';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
