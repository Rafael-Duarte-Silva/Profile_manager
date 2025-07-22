import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/enums/userRole.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    const request: {
      user: {
        sub: string;
        username: string;
      };
    } = context.switchToHttp().getRequest();
    const user = request.user;
    const userDb = await this.userService.findById(user.sub);

    if (!userDb) {
      return false;
    }

    return this.matchRoles(roles, userDb.role);
  }

  private matchRoles(roles: UserRole[], userRole: UserRole): boolean {
    return roles.some((role) => role === userRole);
  }
}
