import { CanActivate, ExecutionContext, Injectable, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (request.method === 'PATCH' && (!request.body || !request.body.email)) {
      return true;
    }
    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new ConflictException('This email already exist');
    }
    return true;
  }
}