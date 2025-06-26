import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../../models/roles';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
    @ApiProperty()
    @IsString()
    documentNumber: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsEnum(Role)
    role: Role;
    
    @ApiProperty()
    @IsDateString()
    birthDate: Date;
}