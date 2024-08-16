import { Controller, Post, Get, Param, Body, Patch, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';


@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'The employee has been successfully created.', type: CreateEmployeeDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all employees.', type: [CreateEmployeeDto] })
  async findAll(): Promise<CreateEmployeeDto[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the employee.', type: CreateEmployeeDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findOne(@Param('id') id: number): Promise<CreateEmployeeDto> {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiResponse({ status: 200, description: 'The employee has been successfully updated.', type: CreateEmployeeDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(@Param('id') id: number, @Body() updateEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiResponse({ status: 204, description: 'The employee has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.employeeService.remove(id);
  }

  // @Delete(':id/soft')
  // @ApiOperation({ summary: 'Soft delete an employee by ID' })
  // @ApiResponse({ status: 204, description: 'The employee has been successfully soft-deleted.' })
  // @ApiResponse({ status: 404, description: 'Employee not found' })
  // async softDelete(@Param('id') id: number): Promise<void> {
  //   await this.employeeService.softDelete(id);
  // }

  @Get(':id/vacation-days')
  async getAccumulatedVacationDays(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.employeeService.getAccumulatedVacationDays(id);
  }
}
