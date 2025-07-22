import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthReponseDto } from './dto/response-auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { FakerUntil } from 'src/shared/utils/fakerUtil';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enums/userRole.enum';
import { UserStatus } from 'src/users/enums/userStatus.enum';
import { LoginUserDto } from 'src/users/dto/login-use.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly expiresIn: number;
  private readonly isSecure: boolean;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expiresIn = parseInt(
      this.configService.get<string>('JWT_EXPIRATION_TIME') || '0',
    );
    this.isSecure = this.configService.get<string>('NODE_ENV') === 'production';
  }

  async login(
    { username, password }: LoginUserDto,
    response: Response,
  ): Promise<AuthReponseDto> {
    const foundUser = await this.userService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };
    const token = this.jwtService.sign(payload);

    response.cookie('jwt', token, {
      httpOnly: true,
      signed: true,
      secure: this.isSecure,
      sameSite: this.isSecure ? 'none' : 'lax',
      maxAge: this.expiresIn * 1000,
    });

    response.cookie('isLoggedIn', 'true', {
      maxAge: this.expiresIn * 1000,
      secure: this.isSecure,
      sameSite: this.isSecure ? 'none' : 'lax',
    });

    return { message: 'authorized' };
  }

  register(createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto,
      UserStatus.MANUALLY,
      UserRole.USER,
    );
  }

  registerAdmin(createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto,
      UserStatus.MANUALLY,
      UserRole.ADMIN,
    );
  }

  generate() {
    const user = new FakerUntil().createUser();

    return this.userService.create(
      user,
      UserStatus.AUTOMATICALLY,
      UserRole.USER,
    );
  }
}
