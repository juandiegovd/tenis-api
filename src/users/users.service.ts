import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Between, Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}
    async findAll(startDate?: string, endDate?: string) {
        const where: any = { isActive: true };

        if (startDate && startDate) {
            where.birthDate = Between(startDate, endDate);
        }
        return this.userRepository.find({
            where
        });
    }

    async create(dto: CreateUsersDto) {
        const userExists = await this.userRepository.findOne({
            where: [
                { documentNumber: dto.documentNumber },
                { email: dto.email }
            ],
            select: ['id', 'documentNumber', 'email']
        });
        if (userExists) {
            throw new ConflictException(`User with document number ${dto.documentNumber} or email ${dto.email} already exists.`);
        }
        dto.password = bcrypt.hashSync(dto.password, 10);
        const user = this.userRepository.create(dto);
        console.log('Creating user with data:', user);
        return this.userRepository.save(user);
    }

    async update(id: number, dto: UpdateUsersDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found.`);
        }
        Object.assign(user, dto);
        console.log('Updating user with id:', id, 'with data:', dto);
        return this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found.`);
        }
        return this.userRepository.remove(user);
    }

    async findById(id: number) {
        return this.userRepository.findOne({
            where: { id }
        });
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role']
        });
    }
}
