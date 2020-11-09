import { Controller, Get, Post, Patch, Delete, Param, Query, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto, QueryUserDto, CreateUserDto, UpdateUserDto, SuccessDto } from './dto/user.dto';

import { DoesUserExist } from '../../core/guards/doesUserExist.guard';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  @ApiResponse({ status: 200, type: [UserDto] })
  async findAll(@Query() queryUserDto: QueryUserDto, @Query('offset') offset = 0, @Query('limit') limit = 10) {
    delete queryUserDto.offset;
    delete queryUserDto.limit;

    return this.userService.findAll(queryUserDto, offset, limit);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserDto })
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return user;
  }

  @Post()
  @UseGuards(DoesUserExist)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: UserDto })
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Patch(':id')
  @UseGuards(DoesUserExist)
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, type: SuccessDto })
  async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    const [updated] = await this.userService.update(id, user);

    if (updated === 0) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return { message: 'success' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessDto })
  async remove(@Param('id') id: number) {
    const deleted = await this.userService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return { message: 'success' };
  }
}
