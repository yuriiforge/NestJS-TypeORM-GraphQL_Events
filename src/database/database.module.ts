import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from '../config/env.validation';
import { NodeEnv } from '../common/enums/node-env.enum';
import { Event } from '../events/entities/event.entity';
import { Attendee } from '../events/entities/attendee.entity';
import { Course } from '../school/entities/course.entity';
import { Subject } from '../school/entities/subject.entity';
import { Teacher } from '../school/entities/teacher.entity';
import { User } from '../auth/entities/user.entity';
import { Profile } from '../auth/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvConfig>) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Event, Attendee, Course, Subject, Teacher, User, Profile],
        synchronize:
          config.get('NODE_ENV') === NodeEnv.Production ? false : true,
      }),
    }),
  ],
})
export class DatabaseModule {}
