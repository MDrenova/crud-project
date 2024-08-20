import { IsString, IsDate, IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { CivilStatus } from '../entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Experience' })
    @IsString()
    @IsNotEmpty()
    experience: string;

    @ApiProperty({ description: 'Departament' })
    @IsString()
    @IsNotEmpty()
    departament: string;

    @ApiProperty({ description: 'date of starting the job' })
    @IsDate()
    @IsNotEmpty()
    dateStartingJob: Date;
    
    @ApiProperty({ description: 'civil status' })
    @IsEnum(CivilStatus, { message: 'Civil status must be one of: Single, Married, Divorced, Widowed' })
    civilStatus: CivilStatus;

    @ApiProperty({ description: 'user data' })
    @IsNotEmpty()
    user: CreateUserDto;
}
