import { Controller, Get, Post, Patch, Delete, Param, Query, Body, NotFoundException, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { QueryUserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';

import { DoesUserExist } from '../../core/guards/doesUserExist.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto, @Query('offset') offset = 0, @Query('limit') limit = 10) {
    delete queryUserDto.offset;
    delete queryUserDto.limit;

    return this.userService.findAll(queryUserDto, offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return user;
  }

  @Post()
  @UseGuards(DoesUserExist)
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Patch(':id')
  @UseGuards(DoesUserExist)
  async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    const [updated] = await this.userService.update(id, user);

    if (updated === 0) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.userService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException('This User doesn\'t exist');
    }

    return { message: 'success' };
  }
}
