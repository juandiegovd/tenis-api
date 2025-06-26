import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService]
})
export class TournamentsModule {}
