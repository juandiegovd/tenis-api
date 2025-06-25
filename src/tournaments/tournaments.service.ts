import { Inject, Injectable } from '@nestjs/common';
import { Tournament } from './tournaments.entity';
import { Repository } from 'typeorm';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Injectable()
export class TournamentsService {
    constructor(
        @Inject(Tournament)
        private readonly tournamentRepository: Repository<Tournament>
    ){}

    async createTournament(tournament: CreateTournamentDto){
        const newTournament = this.tournamentRepository.create(tournament);
        console.log('Creating tournament with data:', newTournament);
        return this.tournamentRepository.save(newTournament);
    }
}
