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

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, MatchesModule,
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
  ],
  providers: [RoleGuard, JwtService],
})
export class AppModule {}
