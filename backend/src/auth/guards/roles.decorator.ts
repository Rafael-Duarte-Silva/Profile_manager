import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/enums/userRole.enum';

export const Roles = Reflector.createDecorator<UserRole[]>();
