import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SortOrder } from 'src/repository/user.repository';

export enum SortByFields {
  firstname = 'firstname',
  lastname = 'lastname',
  state = 'state'
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
    description: 'structure for user object',
  })

  @ApiOperation({ summary: 'create user'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @ApiOperation({ summary: 'show user'})
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @ApiOperation({ summary: 'show one user'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'update user'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'delete user'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: 'soft delete'})
  @Delete(':id/softdelete')
  softDelete(@Param('id') id: string) {
    return this.userService.softDelete(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of users with optional filters and pagination' })
  @ApiQuery({ name: 'firstname', required: false, type: String })
  @ApiQuery({ name: 'lastname', required: false, type: String })
  @ApiQuery({ name: 'state', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, enum: SortByFields })
  @ApiQuery({ name: 'sortOrder', required: false, enum: SortOrder })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
    getFilteredUsers(
        @Query('firstname') firstname?: string,
        @Query('lastname') lastname?: string,
        @Query('state') state?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: SortOrder,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.userService.getFilteredUsers(
            firstname,
            lastname,
            state,
            sortBy,
            sortOrder,
            page,
            limit,
        );
    }
}
