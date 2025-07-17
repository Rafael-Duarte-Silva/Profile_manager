import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
export declare class RolesGuard implements CanActivate {
    private readonly userService;
    private reflector;
    constructor(userService: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private matchRoles;
}
