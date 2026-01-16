import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/event.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { SchoolModule } from './school/school.module';
import { AppController } from './app.controller';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { NodeEnv } from './common/enums/node-env.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
    }),
    DatabaseModule,
    AuthModule,
    EventsModule,
    SchoolModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver as Type<any>,
      autoSchemaFile: true,
      debug: true,
      playground: false,
      plugins: [
        process.env.NODE_ENV === NodeEnv.Production
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
