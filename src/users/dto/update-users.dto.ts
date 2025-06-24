import { IsString } from "class-validator";

export class UpdateUsersDto {
    @IsString()
    name: string;
    @IsString()
    lastName: string;
    @IsString()
    address: string;
    @IsString()
    phone: string;
    @IsString()
    birthDate: Date;
}