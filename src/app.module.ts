import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './role/role.guard';
import { JwtService } from '@nestjs/jwt';
import { TournamentsModule } from './tournaments/tournaments.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { MailController } from './mail/mail.controller';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs';
import { MailService } from './mail/mail.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, MatchesModule,
    SqsModule.register({
      consumers: [
        {
          name: 'tenis-queue',
          queueUrl: process.env.AWS_SQS_QUEUE_URL!,
          region: process.env.AWS_REGION,
          sqs: new SQSClient({
            region: process.env.AWS_REGION,
            endpoint: process.env.AWS_SQS_QUEUE_URL,
            credentials:{
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
          })
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    TournamentsModule,
    FilesModule,
    NotificationsModule,
  ],
  providers: [RoleGuard, JwtService, MailService],
  controllers: [MailController],
})
export class AppModule {}
