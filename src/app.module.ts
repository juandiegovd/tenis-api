import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleGuard } from './role/role.guard';
import { JwtService } from '@nestjs/jwt';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [UsersModule, MatchesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sports_user',
      password: 'password',
      database: 'sports_reservation',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    TournamentsModule
  ],
  providers: [RoleGuard, JwtService],
})
export class AppModule {}
