import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'First name of the user' })
    @IsNotEmpty()
    @IsString()
    firstname: string;
    
    @ApiProperty({ description: 'Last name of the user' })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({ description: 'Birthday of the user' })
    @IsDateString()
    birthday: Date;

    @ApiProperty({ description: 'Email address of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Username of the user' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: 'Password of the user' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Address of the user' })
    @IsNotEmpty()
    @IsString()
    adress: string;

    @ApiProperty({ description: 'State of the user' })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({ description: 'City of the user' })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ description: 'Street of the user' })
    @IsNotEmpty()
    @IsString()
    street: string;
}
