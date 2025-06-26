import { Body, Controller, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Controller('tournaments')
export class TournamentsController {
    constructor(private readonly tournamentService: TournamentsService){}

    @Post()
    createTournament(@Body() body: CreateTournamentDto) {
        return this.tournamentService.createTournament(body);
    }
}
