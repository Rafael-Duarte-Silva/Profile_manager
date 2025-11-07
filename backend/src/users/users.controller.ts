import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './enums/userRole.enum';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles([UserRole.USER, UserRole.ADMIN])
  findAll(@Query() query: FindUserDto) {
    return this.usersService.findAll(query);
  }

  @Put()
  @Roles([UserRole.USER, UserRole.ADMIN])
  update(@Body() user: UpdateUserDto) {
    return this.usersService.update(user);
  }

  @Delete()
  @Roles([UserRole.ADMIN])
  delete(@Body() id: string[]) {
    return this.usersService.deleteAllById(id);
  }
}
