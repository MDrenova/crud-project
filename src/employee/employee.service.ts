import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserRepository } from 'src/repository/user.repository';


@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly userService: UserService,
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const userDto = createEmployeeDto.user;
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      user,
    });
    await this.employeeRepository.save(employee);

    return plainToClass(CreateEmployeeDto, employee);
  }

  async findAll(): Promise<CreateEmployeeDto[]> {
    const employees = await this.employeeRepository.find({ relations: ['user'] });
    return employees.map(employee => plainToClass(CreateEmployeeDto, employee));
  }

  async findOne(id: number): Promise<CreateEmployeeDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return plainToClass(CreateEmployeeDto, employee);
  }

  async update(id: number, updateEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    // Update user
    if (updateEmployeeDto.user) {
      await this.userRepository.update(employee.user.id, updateEmployeeDto.user);
    }

    // Update employee
    const updatedEmployee = this.employeeRepository.merge(employee, updateEmployeeDto);
    await this.employeeRepository.save(updatedEmployee);

    return plainToClass(CreateEmployeeDto, updatedEmployee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.employeeRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
  }
}
