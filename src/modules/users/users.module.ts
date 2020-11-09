import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController]
})
export class UsersModule { }
