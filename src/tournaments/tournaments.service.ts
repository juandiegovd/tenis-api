import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { Tournament } from '../models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(Tournament)
        private readonly tournamentRepository: Repository<Tournament>
    ){}

    async createTournament(tournament: CreateTournamentDto){
        const newTournament = this.tournamentRepository.create(tournament);
        console.log('Creating tournament with data:', newTournament);
        return this.tournamentRepository.save(newTournament);
    }
}
