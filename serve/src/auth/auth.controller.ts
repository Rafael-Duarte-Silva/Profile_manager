import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthReponseDto } from './dto/response-auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';
import { UserRole } from 'src/users/enums/userRole.enum';
import { LoginUserDto } from 'src/users/dto/login-use.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginUserDto): Promise<AuthReponseDto> {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<{ status: string }> {
    return this.authService.register(createUserDto);
  }

  @Post('register/admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  registerAdmin(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ status: string }> {
    return this.authService.registerAdmin(createUserDto);
  }

  @Post('register/generate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.USER, UserRole.ADMIN])
  RegisterGenerate(): Promise<{ status: string }> {
    return this.authService.generate();
  }
}
