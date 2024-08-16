import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository, SortOrder } from 'src/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/response-user.dto';


@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return plainToClass(UserResponseDto, user);
  }
  
  async findAll(): Promise<UserResponseDto[]> {
    const result = await this.userRepository.find();
    return result.map(element => plainToClass(UserResponseDto, element));
  }
  
  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneByOrFail({ id: id });
    return plainToClass(UserResponseDto, user);
  }
  
  async update(id: number, updateUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneByOrFail({ id: id });
    const mergeUser = this.userRepository.merge(user, updateUserDto);
    const result = await this.userRepository.save(mergeUser);
    return plainToClass(UserResponseDto, result);
  }
  
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  
  async softDelete(id: number): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  
  async getFilteredUsers(
    firstname?: string,
    lastname?: string,
    state?: string,
    sortBy?: string,
    sortOrder?: SortOrder,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ users: UserResponseDto[], totalRows: number }> {
    const query = this.userRepository.getFilteredUsers(
      firstname,
      lastname,
      state,
      sortBy,
      sortOrder,
      page,
      limit,
    );
  
    const [users, total] = await query.getManyAndCount();
    const userDtos = users.map(user => plainToClass(UserResponseDto, user));
    return { users: userDtos, totalRows: total };
  }
}
