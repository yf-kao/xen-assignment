import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto, QueryUserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.create<User>(user);
  }

  async findAll(queryUserDto: QueryUserDto, offset, limit): Promise<User[]> {
    return this.userRepository.findAll<User>({ where: { ...queryUserDto }, offset, limit });
  }

  async findOne(id): Promise<User> {
    return this.userRepository.findOne<User>({ where: { id } });
  }

  async findOneByEmail(email): Promise<User> {
    return this.userRepository.findOne<User>({ where: { email } });
  }

  async delete(id) {
    return this.userRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    return this.userRepository.update({ ...data }, { where: { id } });
  }

}