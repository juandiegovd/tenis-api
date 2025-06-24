import { IsDateString, IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../../role/roles';
export class CreateUsersDto {
    @IsString()
    documentNumber: string;
    @IsString()
    name: string;
    @IsString()
    lastName: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    address: string;
    @IsString()
    phone: string;
    @IsEnum(Role)
    role: Role;
    @IsDateString()
    birthDate: Date;
}