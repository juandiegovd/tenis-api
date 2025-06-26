import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUsersDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    birthDate: Date;
}