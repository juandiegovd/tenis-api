import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { Roles } from "src/role/role.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
        return this.usersService.findAll(startDate, endDate);
    }

    @Post()
    create(@Body() body: CreateUsersDto) {
        console.log('Received body:', body);
        return this.usersService.create(body);
    }

    @Put("/:id")
    update(@Param('id') id: number, @Body() body: UpdateUsersDto) {
        return this.usersService.update(id, body);
    }

    @Get("/:id")
    findById(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @Delete("/:id")
    delete(@Param('id') id: number) {
        console.log('Received path parameter id for deletion:', id);
        return this.usersService.delete(id);
    }
}