import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User, Role } from '../models';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
      {
        provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockImplementation(user => Promise.resolve({ id: 1, ...user })),
          },
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it ('should create a user', async () => {
    const createUserDto = {
      documentNumber: '123456789',
      email: 'test@gmail.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test St',
      phone: '1234567890',
      birthDate: new Date('1990-01-01'),
      name: 'Test User',
      role: Role.USER,
    };
    const user = await service.create(createUserDto);
    expect(user).toBeDefined();
    expect(user.documentNumber).toBe(createUserDto.documentNumber);
    expect(user.birthDate).toEqual(new Date(createUserDto.birthDate));
  });
});
