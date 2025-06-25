import { IsDateString, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsDateString()
    startDate: Date;
    @IsDateString()
    endDate: Date;
    @IsString()
    location: string;
    @IsString()
    website: string;
}