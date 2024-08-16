import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserRepository } from 'src/repository/user.repository';
import { addYears, differenceInCalendarDays, endOfYear, startOfYear } from 'date-fns';
import { UserResponseDto } from 'src/user/dto/response-user.dto';


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
  
    return plainToClass(CreateEmployeeDto, {
      ...employee,
      user: plainToClass(UserResponseDto, user),
    });
  }

  async findAll(): Promise<CreateEmployeeDto[]> {
    const employees = await this.employeeRepository.find({ relations: ['user'] });
    return employees.map(employee => plainToClass(CreateEmployeeDto, {
      ...employee,
      user: plainToClass(UserResponseDto, employee.user),
    }));
  }

  async findOne(id: number): Promise<CreateEmployeeDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return plainToClass(CreateEmployeeDto, {
      ...employee,
      user: plainToClass(UserResponseDto, employee.user),  // Transform user to exclude password
    });
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

  // async softDelete(id: number): Promise<void> {
  //   const result = await this.employeeRepository.softDelete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Employee with id ${id} not found`);
  //   }
  // }

  async getAccumulatedVacationDays(employeeId: number): Promise<string> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const today = new Date();
    const employmentStartDate = employee.dateStartingJob;

    // Calculate the start and end dates of the year in which the employee started
    const yearStart = employmentStartDate;
    const yearEnd = addYears(yearStart, 1);

    // Check if today is beyond the end of the year in which the employee started
    if (today > yearEnd) {
        throw new BadRequestException(`You had 20 vacation days, and they expired on ${yearEnd.toDateString()}`);
    }

    // Calculate the number of days the employee has worked since their start date
    const daysWorkedThisYear = differenceInCalendarDays(today, employmentStartDate) + 1;

    // Calculate the total number of days in the employee's starting year
    const totalDaysInYear = differenceInCalendarDays(yearEnd, yearStart) + 1;

    // Calculate accumulated vacation days (20 days for the full year)
    const accumulatedVacationDays = (daysWorkedThisYear / totalDaysInYear) * 20;

    return `Employee with ID ${employeeId} has ${Math.round(accumulatedVacationDays)} vacation days.`;
}

}
